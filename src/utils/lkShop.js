// Возвращает имя категории в дереве категорий по productCategoryId  

export const findProductCategoryName = (cats, productCategoryId) => {
  for (const category of cats) {
    // Проверяем, что subCategories существует и является массивом
    if (Array.isArray(category.subCategories)) {
      for (const subCategory of category.subCategories) {
        // Проверяем, что productCategories существует и является массивом
        if (Array.isArray(subCategory.productCategories)) {
          const productCategory = subCategory.productCategories.find(
            (prod) => prod.productCategoryId === productCategoryId
          );
          if (productCategory) {
            return productCategory.productCategoryName;
          }
        }
      }
    }
  }
  return null;
};


export const findCategoryPath = (productCategoryId, catTree) => {
  for (const category of catTree.categories) {
    for (const subCategory of category.subCategories) {
      for (const productCategory of subCategory.productCategories) {
        if (productCategory.productCategoryId === productCategoryId) {
          return `${category.categoryName} > ${subCategory.subCategoryName} > ${productCategory.productCategoryName}`;
        }
      }
    }
  }
  return "Категория не найдена";

}



