export function formatClockTime(seconds: number): string {
    const result = []
    if (seconds >= 3600) {
        const hour = Math.floor(seconds / 3600)
        if (hour < 10) {
            result.push('0' + hour)
        } else {
            result.push(hour.toString());
        }
        seconds = seconds % 3600;
    }

    if (seconds >= 60) {
        const minute = Math.floor(seconds / 60);
        if (minute < 10) {
            result.push('0' + minute)
        } else {
            result.push(minute.toString());
        }
        result.push();
        seconds = seconds % 60;
    }

    if (seconds < 10) {
        result.push('0' + seconds)
    } else {
        result.push(seconds.toString());
    }

    return result.join(':')
}