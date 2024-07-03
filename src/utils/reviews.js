export const getReviewsString = (num) => {

  if (num % 10 === 1 && num % 100 !== 11) {
    return num + " отзыв";
  } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
    return num + " отзыва";
  } else {
    return num + " отзывов";
  }
}

export const getQuestionsString = (num) => {

  if (num % 10 === 1 && num % 100 !== 11) {
    return num + " вопрос";
  } else if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
    return num + " вопроса";
  } else {
    return num + " вопросов";
  }
}