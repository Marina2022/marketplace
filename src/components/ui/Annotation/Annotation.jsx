import s from './Annotation.module.scss';

const Annotation = ({position='fromRight', children}) => {
  return (
    <div className={s.annotation}>

      <svg className={s.triangle} width="17" height="30" viewBox="0 0 17 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 15L16.5 0.71059V29.2894L0 15Z" fill="#253246"/>
      </svg>

      {children}
    </div>
  );
};

export default Annotation;