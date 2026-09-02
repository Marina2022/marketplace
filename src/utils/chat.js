export function formatDateToDDMMYYYY(isoString) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export const getHowManyChats = (count) => {
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
}

export function getNewWord(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} новых`;
  }

  if (lastDigit === 1) {
    return `${count} новый`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} новых`; // тут у тебя нет варианта "новых/новые", поэтому оставляем "новых"
  }

  return `${count} новых`;
}

export function formatArchived(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  let word;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    word = "архивных";
  } else if (lastDigit === 1) {
    word = "архивный";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    word = "архивных";
  } else {
    word = "архивных";
  }

  return `${count} ${word}`;
}


export const formatChatDateForChat = (date) => {
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
    return 'Сегодня';
  }

  // Вчера
  if (diffDays === 1) {
    return 'Вчера';
  }

  // 2–3 дня назад
  if (diffDays >= 2 && diffDays <= 3) {
    const word =
      diffDays === 2 ? 'дня' : 'дня'; // одинаково, но оставлено явно

    return `${diffDays} ${word}`;
  }

  // дальше — нормальная дата
  return d.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};


export const formatTelegramTime = (isoString) => {
  const date = new Date(isoString);

  const hours = date.getHours();   // без 0 спереди
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};