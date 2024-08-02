export const getProductQuantityString = (num) => {

  if (num % 10 === 1 && num % 100 !== 11) {
    return num + " товар";
  } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
    return num + " товара";
  } else {
    return num + " товаров";
  }
}