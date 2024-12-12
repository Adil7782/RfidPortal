import moment from "moment-timezone";

interface CalculateGmtDefectCountTypes {
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
}

interface ProductDefectAccumulator {
    [productId: string]: {
        qcStatus: string;
        timestamps: string[];
    };
}

export function calculateDefectCounts(data: ProductDefectTypes[]): Promise<CalculateGmtDefectCountTypes> {
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

            const groupedByProductId = data.reduce<ProductDefectAccumulator>((acc, item) => {
                if (!acc[item.productId]) {
                    acc[item.productId] = { qcStatus: item.qcStatus, timestamps: [item.timestamp] };
                } else {
                    acc[item.productId].timestamps.push(item.timestamp);
                }
                return acc;
            }, {});

            Object.values(groupedByProductId).forEach(item => {
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