export const sortOptions = [
  {
    sortColumn: 'price',
    label: 'По цене',
    defaultOrder: 'asc'
  },
  {
    sortColumn: 'discount',
    label: 'По скидке',
    defaultOrder: 'desc'
  },
  {
    sortColumn: 'rating',
    label: 'По рейтингу',
    defaultOrder: 'desc'
  },
  {
    sortColumn: 'reviews',
    label: 'По отзывам покупателей',
    defaultOrder: 'desc'
  },
]

export const sortOptionsMobile = [
  {
    sortColumn: 'price',
    label: 'Сначала дешевые',
    sortOrder: 'asc',
    defaultOrder: 'asc'
  },
  {
    sortColumn: 'price',
    label: 'Сначала дорогие',
    sortOrder: 'desc',
    defaultOrder: 'asc'
  },        
  {
    sortColumn: 'discount',
    label: 'Высокая скидка',
    sortOrder: 'desc',
    defaultOrder: 'desc'
  },
  {
    sortColumn: 'rating',
    label: 'Высокий рейтинг',
    sortOrder: 'desc',
    defaultOrder: 'desc'
  },
  {
    sortColumn: 'reviews',
    label: 'По отзывам покупателей',
    sortOrder: 'desc',
    defaultOrder: 'desc'
  },
]