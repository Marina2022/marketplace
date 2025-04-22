import s from './SingleLeftHeader.module.scss';

const SingleLeftHeader = ({attributes}) => {
  return (
    <div className={s.singleLeftHeader}>
      <div className={s.photoHeader}>Фото</div>
      <div className={s.nameHeader}>Название товара</div>
      <div className={s.brandHeader}>Бренд</div>
      <div className={s.typeHeader}>Тип</div>
      {
        attributes.attributes.map(attribute => <div key={attribute.optionId}
                                                    className={s.attributesHeader}>{attribute.optionName}</div>)
      }
    </div>
  );
};

export default SingleLeftHeader;