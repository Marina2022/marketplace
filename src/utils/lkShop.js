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