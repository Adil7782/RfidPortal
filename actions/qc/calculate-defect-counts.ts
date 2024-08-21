import moment from "moment-timezone";

interface CalculateDefectCountProps {
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
}

interface GmtDefectAccumulator {
    [gmtId: string]: {
        qcStatus: string;
        timestamps: string[];
    };
}

export function calculateDefectCounts(data: GmtDefectTypes[]): Promise<CalculateDefectCountProps> {
    return new Promise((resolve, reject) => {
        try {
            const timezone = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';
            const currentHour = moment().tz(timezone).startOf('hour');

            const totalStatusCounts: StatusCountTypes = {
                totalInspect: 0,
                pass: 0,
                rework: 0,
                reject: 0
            };

            const currentHourStatusCounts: StatusCountTypes = {
                totalInspect: 0,
                pass: 0,
                rework: 0,
                reject: 0
            };

            const groupedByGmtId = data.reduce<GmtDefectAccumulator>((acc, item) => {
                if (!acc[item.gmtId]) {
                    acc[item.gmtId] = { qcStatus: item.qcStatus, timestamps: [item.timestamp] };
                } else {
                    acc[item.gmtId].timestamps.push(item.timestamp);
                }
                return acc;
            }, {});

            Object.values(groupedByGmtId).forEach(item => {
                totalStatusCounts.totalInspect += 1;
                incrementStatusCount(totalStatusCounts, item.qcStatus);

                const earliestTimestamp = moment.min(item.timestamps.map(time => moment(time, "YYYY-MM-DD HH:mm:ss"))).tz(timezone);
                if (earliestTimestamp.isSame(currentHour, 'hour')) {
                    currentHourStatusCounts.totalInspect += 1;
                    incrementStatusCount(currentHourStatusCounts, item.qcStatus);
                }
            });

            resolve({ totalStatusCounts, currentHourStatusCounts });
        } catch (error) {
            reject(error);
        }
    });
}

function incrementStatusCount(statusCounts: StatusCountTypes, status: string) {
    if (status === 'pass') {
        statusCounts.pass += 1;
    } else if (status === 'rework') {
        statusCounts.rework += 1;
    } else if (status === 'reject') {
        statusCounts.reject += 1;
    }
}