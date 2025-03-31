// Возвращает имя категории в дереве категорий по productCategoryId  
export const findProductCategoryName = (cats, productCategoryId) => {
  for (const category of cats) {
    for (const subCategory of category.subCategories) {
      const productCategory = subCategory.productCategories.find(
        (prod) => prod.productCategoryId === productCategoryId
      );
      if (productCategory) {
        return productCategory.productCategoryName;
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
