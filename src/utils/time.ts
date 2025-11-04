import dayjs from "dayjs";

//获取当前时间
export const getTimePeriod = () => {
  const hours = new Date().getHours();

  if (hours >= 5 && hours < 11) {
    return "早上"; // 早上：5:00 - 10:59
  } else if (hours >= 11 && hours < 14) {
    return "中午"; // 中午：11:00 - 13:59
  } else if (hours >= 14 && hours < 18) {
    return "下午"; // 下午：14:00 - 17:59
  } else {
    return "晚上"; // 晚上：18:00 - 4:59
  }
};

//获取时间差
export const getTimeDiffLabel = (start: number | Date, end: number | Date) => {
  const d1 = dayjs(start);
  const d2 = dayjs(end);

  const diffDays = d2.diff(d1, "day", true); // true 表示保留小数

  if (diffDays >= 1) {
    return `${Math.floor(diffDays)}天`;
  }

  const diffHours = Math.floor(d2.diff(d1, "hour", true));

  if (diffHours == 0) {
    return "不到1小时";
  }

  return `${diffHours}小时`;
};
