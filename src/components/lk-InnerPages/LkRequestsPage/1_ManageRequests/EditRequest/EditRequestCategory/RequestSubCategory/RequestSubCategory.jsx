import s from './RequestSubCategory.module.scss';

const RequestSubCategory = ({subCat, lastOne, selectedCatId, setSelectedCatId}) => {

  const idSelected = subCat.subCategoryId === selectedCatId

  const handleClick = () => {
    setSelectedCatId(subCat.subCategoryId)
  }

  return (
    <div className={`${s.subCategoryWrapper} ${idSelected ? s.selectedCategory : ''} `} onClick={handleClick}>
      <div className={s.subCatHeader}>
        <div className={s.horizontalLine}></div>
        {
          lastOne && <div className={s.verticalTickEraser}></div>
        }
        <p className={s.mainCatName}>{subCat.subCategoryName}</p>
      </div>

      <div className={s.outerWrapper}>
        <div className={s.verticalLine}></div>
        {
          lastOne && <div className={s.verticalLineEraser}></div>
        }
      </div>
    </div>
  );
};

export default RequestSubCategory;