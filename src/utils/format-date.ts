function paddedDate(value: number | string, length = 2, padding = '0') {
    return `${value}`.padStart(length, padding);
}

function formatDate(date: Date, pattern = 'YYYY-MM-DD') {
    if (Number.isNaN(Number(date))) {
        return 'Invalid Date';
    }

    const tokens: Record<string, string> = {
        YYYY: paddedDate(date.getFullYear(), 4),
        MM: paddedDate(date.getMonth() + 1),
        DD: paddedDate(date.getDate()),
        HH: paddedDate(date.getHours()),
        mm: paddedDate(date.getMinutes()),
        ss: paddedDate(date.getSeconds()),
        SSS: paddedDate(date.getMilliseconds(), 3),
        Z: (() => {
            const offset = -date.getTimezoneOffset();
            const sign = offset >= 0 ? '+' : '-';
            const hours = paddedDate(Math.floor(Math.abs(offset) / 60));
            const minutes = paddedDate(Math.abs(offset) % 60);
            return `${sign}${hours}:${minutes}`;
        })(),
    };

    return pattern.replace(
        /YYYY|MM|DD|HH|mm|ss|SSS|Z/g,
        (match) => tokens[match] as string,
    );
}

export default formatDate;
