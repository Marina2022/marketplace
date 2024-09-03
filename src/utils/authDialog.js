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

  // Форматируем минуты и секунды, чтобы они всегда были двухзначными
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}