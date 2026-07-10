export const formatPhone = (phone) => {

  const arrFromPhone = phone.split("")

  const newArr = arrFromPhone.map((digit, i) => {

    if (i === 0) return `(${digit}`
    if (i === 2) return `${digit}) `
    if (i === 5) return `${digit}-`
    if (i === 7) return `${digit}-`
    return digit

  })

  const newPhone = newArr.join("")
  return newPhone
}

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${minutes}:${formattedSeconds}`;
};

export function formatMinutes(seconds) {
  if (seconds < 60) {
    return '1 минуту';
  }

  const minutes = Math.floor(seconds / 60);

  const getMinutesWord = (n) => {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'минут';
    if (lastDigit === 1) return 'минуту';
    if (lastDigit >= 2 && lastDigit <= 4) return 'минуты';
    return 'минут';
  };

  return `${minutes} ${getMinutesWord(minutes)}`;
}