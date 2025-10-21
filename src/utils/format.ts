import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isoWeek);

//处理综艺的日期
export const formatRemarks = (remarks: string) => {
  return remarks.replace(/(\d{4})(\d{2})(\d{2})/g, (_, year, month, day) => {
    return `${year}-${month}-${day}`;
  });
};

//处理地区语言等副标题
export const formatSub = (sub: string) => {
  if (!sub) {
    return "未知";
  }

  const arr = sub.split(",");

  return arr[0] + (arr.length > 1 ? "..." : "");
};

//补0
const pad = (num: number) => {
  return num.toString().padStart(2, "0");
};

//处理时间
export const formatSeconde = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (h > 0) {
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }

  return `${pad(m)}:${pad(s)}`;
};

//格式化历史记录时间
export const formatHistory = (date: number) => {
  const d = dayjs(date);
  const now = dayjs();

  if (d.isToday()) {
    return `今天 ${d.format("HH:mm")}`;
  }

  if (d.isYesterday()) {
    return `昨天 ${d.format("HH:mm")}`;
  }

  if (d.isoWeek() === now.isoWeek() && d.year() === now.year()) {
    const weekMap = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    return `${weekMap[d.isoWeekday() - 1]} ${d.format("HH:mm")}`;
  }

  return d.format("YYYY-MM-DD HH:mm");
};
