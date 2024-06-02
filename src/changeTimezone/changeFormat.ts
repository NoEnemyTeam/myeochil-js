export function formatDate(date: string, format?: string): string | { [key: string]: string } {
    const [rawDate, rawTime] = date.split(" ");
    const [year, month, day] = rawDate.split("-");
    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const result: { [key: string]: string } = {};

    if (!format) {
        // format 매개변수가 없는 경우 YYYY-MM-DD, MM-DD-YYYY, DD-MM-YYYY 모두 반환
        result["YYYY-MM-DD"] = `${year}-${formattedMonth}-${formattedDay}`;
        result["MM-DD-YYYY"] = `${formattedMonth}-${formattedDay}-${year}`;
        result["DD-MM-YYYY"] = `${formattedDay}-${formattedMonth}-${year}`;
        if (rawTime) {
            // 시간 부분이 있는 경우 시간을 포함하여 반환
            for (const key in result) {
                result[key] += ` ${rawTime}`;
            }
        }
    }else if(format){
        let formattedDate: string;
        if (format === "MM-DD-YYYY") {
            formattedDate = `${formattedMonth}-${formattedDay}-${year}`;
        } else if (format === "DD-MM-YYYY") {
            formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
        } else {
            // 지원하지 않는 형식일 경우 오류 메시지 반환
            throw new Error("Unsupported Date Format: please use 'DD-MM-YYYY' or 'MM-DD-YYYY'.");
        }
    
        // 시간 부분이 있는 경우 시간을 붙여줌
        if (rawTime) {
            return `${formattedDate} ${rawTime}`;
        } else {
            return formattedDate;
        }
    }else {
        // 지원하지 않는 형식일 경우 오류 메시지 반환
        throw new Error("Unsupported Date Format: please use 'DD-MM-YYYY' or 'MM-DD-YYYY'.");
    }

    return result;
}
