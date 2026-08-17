export const getExpireText = (expireAt) => {
  const now = new Date();
  const expireDate = new Date(expireAt);

  const diffMs = expireDate - now;

  if (diffMs <= 0) return 'Истекло';

  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  const getDayWord = (n) => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'дней';
    if (lastDigit === 1) return 'день';
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
    return 'дней';
  };

  if (diffDays === 1) return 'Истекает через 1 день';

  return `Истекает через ${diffDays} ${getDayWord(diffDays)}`;
};

export const formatDatShortMonth = (dateString) => {
  const date = new Date(dateString);

  const months = [
    'янв', 'фев', 'мар', 'апр', 'май', 'июн',
    'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'
  ];

  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

// если в соотв. случаях выводим Сегодня и Вчера
export const getDateLabel = (date) => {
  const d = new Date(date);
  const now = new Date();

  const isToday =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const isYesterday =
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();

  if (isToday) return 'Сегодня';
  if (isYesterday) return 'Вчера';

  return formatDatShortMonth(date);
};

export const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} Б`;

  if (bytes < 1024 ** 2) {
    return `${Math.round(bytes / 1024)} Кб`;
  }

  if (bytes < 1024 ** 3) {
    return `${Number((bytes / 1024 ** 2).toFixed(1))} Мб`;
  }

  return `${Number((bytes / 1024 ** 3).toFixed(1))} Гб`;
};