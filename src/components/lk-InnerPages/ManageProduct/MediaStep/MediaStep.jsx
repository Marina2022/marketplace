import s from './MediaStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";

const MediaStep = () => {

  const placeholders = Array.from({length: 15})

  return (
    <div>
      <h2 className={s.title}>Медиа</h2>

      <div className={s.headerWrapper}>
        <h3 className={s.subtitle}>Фотографии товара</h3>
        <Button>Добавить фото</Button>
      </div>

      <div className={s.mobileScrollWrapper}>
        <ul className={s.photosWrapper}>
          {
            placeholders.map((placeholder, i) => {
              return (

                <li key={i} className={s.placeholder}>
                  {i}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default MediaStep;