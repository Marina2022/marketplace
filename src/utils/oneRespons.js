export function formatRequests(count) {
  const cases = ['заявка', 'заявки', 'заявок'];

  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} ${cases[2]}`;
  }

  if (mod10 === 1) {
    return `${count} ${cases[0]}`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} ${cases[1]}`;
  }

  return `${cases[2]}`;
}


export function formatDisputes(count) {
  const cases = ['спор', 'спора', 'споров'];

  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `${count} ${cases[2]}`;
  }

  if (mod10 === 1) {
    return `${count} ${cases[0]}`;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return `${count} ${cases[1]}`;
  }

  return `${cases[2]}`;
}