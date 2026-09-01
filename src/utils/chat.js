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