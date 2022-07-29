import dayjs from 'dayjs';
export const useFormatDate = (text) => {
  if (!text) return;
  return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
};
