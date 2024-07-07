// Отзывы в АПИ приходят такие:

const response = {
  reviews: [
    {
      "reviewId": "0a59835c-1bcc-4ef3-adba-f369ec2af2ad",
      "userId": "2e9db524-e273-423a-b829-a07f6cd4ecad",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Марина В.",
      "reviewRating": 5,
      "experience": "Меньше месяца",
      "advantages": "Понятный функционал,простота использования",
      "disadvantages": "не обнаружены,меня все устраивает",
      "comment": "Xiaomi у меня впервые,были у меня только Samsung. Сын рекомендовал мне приобрести данный агрегат и скажу,что оказался прав. Ненужные приложения и игрушки сразу удалила. Камера меня устраивает,функционал возможностей ее использования в хорошем наборе. со своей функцией телефона справляется отлично. Работает шустро. В игрушки не играю,ничего сказать по данному вопросу не могу. Есть даже встроенный шагомер. До 100% зарядился за 45 минут с 14%. Ставлю твердую 5. Чехол в комплекте. доставка быстрая,коробка в идеальном состоянии. Продавцу плюс 1000 к карме)",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369046Z",
      "reviewImages": [],
      "reviewAnswers": [
        {
          "answerId": "8fb3a3a4-3b63-4102-be95-d5bcf29991a2",
          "userId": null,
          "companyId": "5133d578-a099-4230-b2ac-ed6e40b4dd35",
          "responderType": "company",
          "shopName": "MWInformTech",
          "answer": "Здравствуйте! Благодарим вас за высокую оценку!",
          "likes": 0,
          "dislikes": 0,
          "createDate": "2024-07-04T17:24:28.471687Z"
        }
      ]
    },
    {
      "reviewId": "af9a598e-7554-4b73-b08a-71e81fc0c72a",
      "userId": null,
      "companyId": "18089a94-2244-425d-a4cb-6ce866802aeb",
      "reviewerType": "company",
      "reviewerName": "ООО \"Омела\"",
      "reviewRating": 5,
      "experience": "Меньше месяца",
      "advantages": "Хороший телефон",
      "disadvantages": "Недостатки не обнаружены",
      "comment": "Преобрели 20 телефонов для сотрудников компании, все телфоны работают отлично.",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369103Z",
      "reviewImages": [],
      "reviewAnswers": [
        {
          "answerId": "28df3636-b76c-44b2-ba7f-a0f20de7ecb5",
          "userId": null,
          "companyId": "5133d578-a099-4230-b2ac-ed6e40b4dd35",
          "responderType": "company",
          "shopName": "MWInformTech",
          "answer": "Здравствуйте! Благодарим вас за высокую оценку!",
          "likes": 0,
          "dislikes": 0,
          "createDate": "2024-07-04T17:24:28.471707Z"
        }
      ]
    },
    {
      "reviewId": "ae83153c-1b21-4a1a-9071-565598d5f446",
      "userId": "5b5cbcab-3e97-45b0-931e-83a97675ef55",
      "companyId": null,
      "reviewerType": "Anonimous",
      "reviewerName": "Пользователь скрыл свои данные",
      "reviewRating": 5,
      "experience": "Месяц назад",
      "advantages": "Отличный телефон, удобно держать в руке)",
      "disadvantages": "Пока не обнаружил недостатков",
      "comment": "Купил дочке в подарок на день рождения, очень довольна телефоном",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369104Z",
      "reviewImages": [
        {
          "reviewImageName": "1000548153",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/ae83153c-1b21-4a1a-9071-565598d5f446/1000548153.png"
        },
        {
          "reviewImageName": "1000548154",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/ae83153c-1b21-4a1a-9071-565598d5f446/1000548154.png"
        },
        {
          "reviewImageName": "1000548152",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/ae83153c-1b21-4a1a-9071-565598d5f446/1000548152.png"
        },
        {
          "reviewImageName": "1000548151",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/ae83153c-1b21-4a1a-9071-565598d5f446/1000548151.png"
        }
      ],
      "reviewAnswers": [
        {
          "answerId": "a7e03aaa-6ee5-4fa6-ac4c-45958c2fceec",
          "userId": null,
          "companyId": "5133d578-a099-4230-b2ac-ed6e40b4dd35",
          "responderType": "company",
          "shopName": "MWInformTech",
          "answer": "Добрый день! Спасибо за отзыв. Ждем вас за покупками :)",
          "likes": 0,
          "dislikes": 0,
          "createDate": "2024-07-04T17:24:28.471708Z"
        }
      ]
    },
    {
      "reviewId": "1fc0ed40-c12c-4f5b-9041-546ce4dfa505",
      "userId": "161598ac-ae4f-4bce-bb9b-892fd5ac7c18",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Иван Т.",
      "reviewRating": 5,
      "experience": "Месяц назад",
      "advantages": "Из всей линейки note он идеальный",
      "disadvantages": "Нет, не обнаружил, только достоинства",
      "comment": null,
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369105Z",
      "reviewImages": [],
      "reviewAnswers": []
    },
    {
      "reviewId": "feeafdab-1a8c-4db9-95c1-3c45220860a3",
      "userId": "86add0d1-49e7-4c9e-a7ac-300a3762f1bc",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Татьяна П.",
      "reviewRating": 5,
      "experience": "Меньше месяца",
      "advantages": "Все идеально. Телефон отличный. Все работает",
      "disadvantages": "Недостатков нет. Советую",
      "comment": "Телефон лучше нот 12. Просто разбила нот12 которому всего пол года. Стал вопрос на что менять т.к. оригинальный экран стоит с заменой 13к. За эту сумму купил этот телефон и ни разу не пожалел. Он лучше 12,камера круче, 2 динамика, он меньше и уже, единственное как по мне датчик отпечатка пальца всё же удобнее сбоку, а не на экране.",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369106Z",
      "reviewImages": [
        {
          "reviewImageName": "1000548157",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/feeafdab-1a8c-4db9-95c1-3c45220860a3/1000548157.png"
        },
        {
          "reviewImageName": "1000548155",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/feeafdab-1a8c-4db9-95c1-3c45220860a3/1000548155.png"
        },
        {
          "reviewImageName": "1000548156",
          "reviewImagePath": "Data/products/ea69c644-c2c1-414e-862a-fe8705e8781a/reviews/feeafdab-1a8c-4db9-95c1-3c45220860a3/1000548156.png"
        }
      ],
      "reviewAnswers": []
    },
    {
      "reviewId": "b080dcc1-26c2-41ab-a02a-9f25d09f0ea1",
      "userId": "b464dc47-a1c2-4377-a67b-803b850aa7af",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Юлия Т.",
      "reviewRating": 5,
      "experience": "Меньше месяца",
      "advantages": "цена, экран, производительность, комплектация",
      "disadvantages": "пластиковый корпус",
      "comment": "нужен был андроид в дополнение к айфону. купили по акции за 9300. учитывая стоимость покупки одни достоинства. из недостатков: корпус маркий и не очень приятный. в чехле из комплекта намного лучше. видел в фирменном салоне за 16000. столько он того не стоит.",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369106Z",
      "reviewImages": [],
      "reviewAnswers": []
    },
    {
      "reviewId": "4b0bfb54-0b22-4894-8b9f-3e0e059c5ddf",
      "userId": "3a4b774b-cb52-477d-8d1b-fe21fe302d2f",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Артем Ю.",
      "reviewRating": 4,
      "experience": "Меньше месяца",
      "advantages": "хорошо держит заряд",
      "disadvantages": "камеры мыльные. только в хороших условиях омвещения кадры получаются четкимм",
      "comment": "свою цену оправдывает",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369107Z",
      "reviewImages": [],
      "reviewAnswers": []
    },
    {
      "reviewId": "7d19e071-b60d-4528-b986-aafbf3358fdc",
      "userId": "77b0c150-b596-4ee2-87a6-cc7b6da31cbd",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Вадим С.",
      "reviewRating": 4,
      "experience": "Меньше месяца",
      "advantages": "Удобно лежит в руке, хорошая комплектация, очень понравился чехол комплектный, долго держит батарею, все приложения ( не играю) работают нормально.",
      "disadvantages": "Как выше писал - все приложения работают нормально, не хорошо или отлично, а нормально. Телефон подлагивает, это чувствуется даже на скролах по экранам рабочего стола, не говоря о браузере. С другой стороны чего ждать от бюджетного аппарата.",
      "comment": "Своих денег стоит, на мой взгляд, брался как телефон для тестирования сервисов, не основной, может избалован флагманами и привык что все плавно, но именно подлагивания оставляют неприятной ощущение",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369107Z",
      "reviewImages": [],
      "reviewAnswers": []
    },
    {
      "reviewId": "5103a8f5-796a-4390-86dd-e3e19075e128",
      "userId": "88cf7eda-902b-4a81-8c5e-77b907c0d4e9",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Денис Б.",
      "reviewRating": 1,
      "experience": "Меньше месяца",
      "advantages": "упаковка и всё !!!!",
      "disadvantages": "не всегда срабатывает сенсор\r\nвидео снимает плохого качества особенно если приближать так это просто ужас",
      "comment": "арактеристики которые заявлены не отражают действительность потому что даже старый телефон с камерой на 32 мегапикселя снимает видео намного лучше чем этот с камерой на 108 мегапикселей",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.369108Z",
      "reviewImages": [],
      "reviewAnswers": []
    },
    {
      "reviewId": "8e22229b-5b36-49f7-ac61-22ce68077027",
      "userId": "ccbb8580-7522-4ab4-8489-f32a9e45009f",
      "companyId": null,
      "reviewerType": "user",
      "reviewerName": "Павел С.",
      "reviewRating": 1,
      "experience": "Меньше месяца",
      "advantages": "телефон не плохой! функциональный",
      "disadvantages": "камера не 108! отклик экрана не очень иногда!",
      "comment": "телефон не советую!!! лучше Samsung или nokia!!",
      "likes": 0,
      "dislikes": 0,
      "createDate": "2024-07-04T17:24:28.36912Z",
      "reviewImages": [],
      "reviewAnswers": [
        {
          "answerId": "53496b5e-3633-4540-aa26-37f2d979e9be",
          "userId": null,
          "companyId": "5133d578-a099-4230-b2ac-ed6e40b4dd35",
          "responderType": "company",
          "shopName": "MWInformTech",
          "answer": "Здравствуйте! Нам очень жаль, что вам не понравился товар.",
          "likes": 0,
          "dislikes": 0,
          "createDate": "2024-07-04T17:24:28.471709Z"
        }
      ]
    }
  ],
  "cursorPaging": {
    "nextCursor": 14,
    "cursorLimit": 14
  }
}