import s from './Annotation.module.scss';

const Annotation = ({position = 'fromRight', children}) => {
  
  let annotationClass = s.annotation  
  if (position === 'fromLeft') annotationClass+= ' ' +  s.annotationFromLeft
  if (position === 'fromTop') annotationClass+= ' ' +  s.annotationFromTop

  let svgClass = s.triangle
  if (position === 'fromLeft') svgClass+= ' ' +  s.triangleFromLeft
  if (position === 'fromTop') svgClass+= ' ' +  s.triangleFromTop
  
  return (
    // <div className={`${s.annotation} ${position === 'fromLeft' ? s.annotationFromLeft : ""}`}>
    <div className={annotationClass}>
      <svg className={svgClass}  width="17" height="30" viewBox="0 0 17 30" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0 15L16.5 0.71059V29.2894L0 15Z" fill="#253246"/>
      </svg>
      {children}
    </div>
  );
};

export default Annotation;