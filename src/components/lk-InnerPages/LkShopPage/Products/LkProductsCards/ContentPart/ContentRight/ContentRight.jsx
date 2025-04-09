import s from './ContentRight.module.scss';

const ContentRight = ({products}) => {
  return (
    <div className={s.contentRight}>
      <div className={s.contentRightHeader}>
        Статус
      </div>
    </div>
  );
};

export default ContentRight;