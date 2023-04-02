/**
 *
 * @param time 需要转换的时间
 * @param format 需要返回的时间格式
 * @returns {string} 返回转换好的时间格式
 */
export default function formatDate(
  time: string | number | Date = new Date().getTime(),
  format: string = 'Y-M-D H:m:s',
) {
  let date = new Date(time);
  let config = {
    Y: date.getFullYear(),
    M: add0(date.getMonth() + 1),
    D: add0(date.getDate()),
    H: add0(date.getHours()),
    m: add0(date.getMinutes()),
    s: add0(date.getSeconds()),
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
}

function add0(num) {
  return num < 10 ? '0' + num : num;
}
