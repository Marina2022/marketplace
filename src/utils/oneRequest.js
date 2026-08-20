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


export const getWordByCount = (count, word) => {
  const forms = {
    Отклик: ['Отклик', 'Отклика', 'Откликов'],
    Новый: ['Новый', 'Новых', 'Новых'],
    Просмотр: ['Просмотр', 'Просмотра', 'Просмотров'],
  };

  const [one, few, many] = forms[word];

  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return one;

  if (
    mod10 >= 2 &&
    mod10 <= 4 &&
    !(mod100 >= 12 && mod100 <= 14)
  ) {
    return few;
  }

  return many;
};


export const getStartDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 13);

  return date
    .toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
    })
    .replace('.', '');
};


export const formatDateLongMonth = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const getChatsLabel = (count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} чат`;
  }

  if (
    mod10 >= 2 &&
    mod10 <= 4 &&
    !(mod100 >= 12 && mod100 <= 14)
  ) {
    return `${count} чата`;
  }

  return `${count} чатов`;
};

export const getInitials = (displayName) => {
  const words = displayName
    .replace(/["«»\\]/g, '')
    .trim()
    .split(/\s+/);

  return words[1]?.slice(0, 2).toUpperCase() || '';
}



export  const formatChatDate = (date) => {
  const d = new Date(date);
  const now = new Date();

  const startOfDay = (date) => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  };

  const diffDays = Math.floor(
    (startOfDay(now) - startOfDay(d)) / (1000 * 60 * 60 * 24)
  );

  // Сегодня
  if (diffDays === 0) {
    return d.toLocaleTimeString('ru-RU', {
      hour: 'numeric',
      minute: '2-digit',
    });
  }

  // Вчера
  if (diffDays === 1) {
    return 'вчера';
  }

  // До месяца
  if (diffDays < 30) {
    return `${diffDays} ${getDayWord(diffDays)} `;
  }

  // Месяц и больше
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).replace('.', '');
};

const getDayWord = (count) => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return 'день';

  if (
    mod10 >= 2 &&
    mod10 <= 4 &&
    !(mod100 >= 12 && mod100 <= 14)
  ) {
    return 'дня';
  }

  return 'дней';
};