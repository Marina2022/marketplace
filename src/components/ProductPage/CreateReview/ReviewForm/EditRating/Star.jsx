import s from './EditRating.module.scss';

const Star = ({index, rating, setTempRating, tempRating, setRating, isInside}) => {

  let active = false

  if (!isInside) {
    active = index <= rating - 1
  } else {
    active = index <= tempRating - 1
  }

  return (
    <div className={s.starWrapper} onMouseLeave={() => setTempRating(1)} onMouseEnter={() => setTempRating(index + 1)}
         onClick={() => setRating(index + 1)}>
      <svg
        className={active ? s.activeStar : s.star} width="34" height="33" viewBox="0 0 34 33" fill="#AAB7BF"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.0489 0.927051C16.3483 0.00574017 17.6517 0.00574017 17.9511 0.927051L21.2658 11.1287C21.3996 11.5407 21.7836 11.8197 22.2168 11.8197H32.9434C33.9122 11.8197 34.3149 13.0593 33.5312 13.6287L24.8532 19.9336C24.5027 20.1883 24.3561 20.6396 24.4899 21.0517L27.8046 31.2533C28.104 32.1746 27.0495 32.9407 26.2658 32.3713L17.5878 26.0664C17.2373 25.8117 16.7627 25.8117 16.4122 26.0664L7.73419 32.3713C6.95048 32.9407 5.896 32.1746 6.19535 31.2533L9.51006 21.0517C9.64393 20.6396 9.49728 20.1883 9.14679 19.9336L0.468768 13.6287C-0.314945 13.0593 0.0878303 11.8197 1.05655 11.8197H11.7832C12.2164 11.8197 12.6004 11.5407 12.7342 11.1287L16.0489 0.927051Z"/>
      </svg>
    </div>
  );
};

export default Star;