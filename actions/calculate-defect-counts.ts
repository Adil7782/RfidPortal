import moment from "moment-timezone";

interface CalculateDefectCountProps {
    totalStatusCounts: StatusCountTypes;
    currentHourStatusCounts: StatusCountTypes;
}

export function calculateDefectCounts(data: ProductDefectTypes[]): Promise<CalculateDefectCountProps> {
    return new Promise((resolve, reject) => {
        try {
            const timezone = process.env.NODE_ENV === 'development' ? 'Asia/Colombo' : 'Asia/Dhaka';
            const currentHour = moment().tz(timezone).startOf('hour');
            // console.log("currentHour", currentHour);

            // Initialize counters for total counts and current hour counts
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

            // Process each entry in the provided data
            data.forEach(item => {
                const itemTimestamp = moment(item.timestamp, "YYYY-MM-DD HH:mm:ss").tz(timezone);

                // Always increment total inspections
                totalStatusCounts.totalInspect += 1;
                incrementStatusCount(totalStatusCounts, item.qcStatus);

                // Check if the item's timestamp falls within the current hour
                if (itemTimestamp.isSame(currentHour, 'hour')) {
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