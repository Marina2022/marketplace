export function formatResponses(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} откликов`;
  }

  if (mod10 === 1) {
    return `${count} отклик`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} отклика`;
  }

  return `${count} откликов`;
}


export  function formatActiveChats(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} активных чатов`;
  }

  if (mod10 === 1) {
    return `${count} активный чат`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} активных чата`;
  }

  return `${count} активных чатов`;
}

export function formatPinned(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} закреплено`;
  }

  if (mod10 === 1) {
    return `${count} закреплён`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} закреплено`;
  }

  return `${count} закреплено`;
}


export function formatNewMessages(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} новых сообщений`;
  }

  if (mod10 === 1) {
    return `${count} новое сообщение`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} новых сообщения`;
  }

  return `${count} новых сообщений`;
}