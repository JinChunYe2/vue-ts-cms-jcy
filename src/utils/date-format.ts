import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
    utcString: string,
    format: string = DATE_TIME_FORMAT
) {
    // 0时区和东八区的区别得用偏移utcOffset(8)
    return dayjs.utc(utcString).utcOffset(8).format(format)
}

// 如果是其它的格式的话，比如时间戳形式
export function formatTimestamp(
    timestamp: number,
    format: string = DATE_TIME_FORMAT
) {
    return ''
}
