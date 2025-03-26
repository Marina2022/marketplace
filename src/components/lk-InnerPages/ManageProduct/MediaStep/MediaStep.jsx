import s from './MediaStep.module.scss';

const MediaStep = () => {

  const placeholders = Array.from({length: 15})

  return (
    <div>
      <h2 className={s.title}>Медиа</h2>

      <h3 className={s.subtitle}>Фотографии товара</h3>

      <ul className={s.photosWrapper}>
        {
          placeholders.map((placeholder, i) => {
          return  (
            
            <li key={i} className={s.placeholder}>
              {i}
            </li>
            
          )
          })
        }
      </ul>
    </div>
  );
};

export default MediaStep;