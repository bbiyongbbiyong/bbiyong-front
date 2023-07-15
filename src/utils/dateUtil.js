const today = new Date();

export const getMonth = () => {
  return `${today.getMonth() + 1}`.slice(-2);
};

export const getDay = () => {
  return `${today.getDate()}`.slice(-2);
};

export const getHours = () => {
  const hour = today.getHours();
  let result = '';

  result += hour >= 12 ? '오후 ' : '오전 ';
  result += hour >= 13 ? `${hour - 12}` : `${hour}`;

  return result;
};
