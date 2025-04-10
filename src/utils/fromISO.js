
export const getStringFromISO = (str)=>{

  const isoDate = str;
  const date = new Date(isoDate);

  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];

  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

  return formattedDate  
}


export const formatDateToDDMMYYYY = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // месяцы с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}