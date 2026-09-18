export function dashboardFormatDateRu(dateString) {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC', // важно, чтобы не сдвигало дату
  });

  let formatted = formatter.format(date);

  // Делаем первую букву заглавной
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}


export function formatEventDate(dateString)  {
  const date = new Date(dateString);

  const now = new Date();

  // нормализуем к дню (без времени)
  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.floor(
    (startOfDay(now) - startOfDay(date)) / (1000 * 60 * 60 * 24)
  );

  const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const time = timeFormatter.format(date);

  const dayFormatter = new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
  });

  const dayMonth = dayFormatter.format(date);

  if (diffDays === 0) {
    return `Сегодня, ${time}`;
  }

  if (diffDays === 1) {
    return `Вчера, ${time}`;
  }

  return `${dayMonth}, ${time}`;
}


export function formatChatDateForDashboard(isoString) {
  const date = new Date(isoString);
  const now = new Date();

  const msInDay = 1000 * 60 * 60 * 24;

  const startOfDay = (d) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const diffDays = Math.floor(
    (startOfDay(now).getTime() - startOfDay(date).getTime()) / msInDay
  );

  const time = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const monthNames = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря",
  ];

  if (diffDays === 0) {
    return time; // 10:45
  }

  if (diffDays === 1) {
    return "вчера";
  }

  if (diffDays >= 2 && diffDays <= 3) {
    return `${diffDays} дня`;
  }

  // иначе дата: 11 сентября
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}