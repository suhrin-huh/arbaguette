export default {
  dateToKrString: (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return minute ? `${month}월 ${day}일 ${hour}시 ${minute}분` : `${month}월 ${day}일 ${hour}시 `;
  },
};
