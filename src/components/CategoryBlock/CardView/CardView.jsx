import s from './CardView.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getCartView, setCardView} from "@/store/catalogSlice.js";
const CardView = () => {
   
  const cardView = useSelector(getCartView)
  const dispatch = useDispatch()
  const onVerticalClick = () => {

    dispatch(setCardView('vertical'))
    
  }

  const onHorizontalClick = () => {
    dispatch(setCardView('horizontal'))    
  }
  
  return (
      <div className={s.wrapper}>
        <div className={s.active}>
          <button onClick={onHorizontalClick}>
            <svg className={cardView === 'horizontal' ? s.active : ''} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M19.9 22.75H4.1C2.18 22.75 1.25 21.77 1.25 19.77V15.73C1.25 13.72 2.18 12.75 4.1 12.75H19.9C21.82 12.75 22.75 13.73 22.75 15.73V19.77C22.75 21.77 21.82 22.75 19.9 22.75ZM4.1 14.25C3.09 14.25 2.75 14.46 2.75 15.73V19.77C2.75 21.04 3.09 21.25 4.1 21.25H19.9C20.91 21.25 21.25 21.04 21.25 19.77V15.73C21.25 14.46 20.91 14.25 19.9 14.25H4.1Z"
              />
              <path
                  d="M19.9 11.25H4.1C2.18 11.25 1.25 10.27 1.25 8.27V4.23C1.25 2.22 2.18 1.25 4.1 1.25H19.9C21.82 1.25 22.75 2.23 22.75 4.23V8.27C22.75 10.27 21.82 11.25 19.9 11.25ZM4.1 2.75C3.09 2.75 2.75 2.96 2.75 4.23V8.27C2.75 9.54 3.09 9.75 4.1 9.75H19.9C20.91 9.75 21.25 9.54 21.25 8.27V4.23C21.25 2.96 20.91 2.75 19.9 2.75H4.1Z"
              />
            </svg>
          </button>
        </div>
        
        
        <button onClick={onVerticalClick}>
          <svg className={cardView === 'vertical' ? s.active : ''} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.77 11.25H15.73C13.72 11.25 12.75 10.36 12.75 8.52V3.98C12.75 2.14 13.73 1.25 15.73 1.25H19.77C21.78 1.25 22.75 2.14 22.75 3.98V8.51C22.75 10.36 21.77 11.25 19.77 11.25ZM15.73 2.75C14.39 2.75 14.25 3.13 14.25 3.98V8.51C14.25 9.37 14.39 9.74 15.73 9.74H19.77C21.11 9.74 21.25 9.36 21.25 8.51V3.98C21.25 3.12 21.11 2.75 19.77 2.75H15.73Z"/>
            <path
                d="M19.77 22.75H15.73C13.72 22.75 12.75 21.77 12.75 19.77V15.73C12.75 13.72 13.73 12.75 15.73 12.75H19.77C21.78 12.75 22.75 13.73 22.75 15.73V19.77C22.75 21.77 21.77 22.75 19.77 22.75ZM15.73 14.25C14.55 14.25 14.25 14.55 14.25 15.73V19.77C14.25 20.95 14.55 21.25 15.73 21.25H19.77C20.95 21.25 21.25 20.95 21.25 19.77V15.73C21.25 14.55 20.95 14.25 19.77 14.25H15.73Z"/>
            <path
                d="M8.27 11.25H4.23C2.22 11.25 1.25 10.36 1.25 8.52V3.98C1.25 2.14 2.23 1.25 4.23 1.25H8.27C10.28 1.25 11.25 2.14 11.25 3.98V8.51C11.25 10.36 10.27 11.25 8.27 11.25ZM4.23 2.75C2.89 2.75 2.75 3.13 2.75 3.98V8.51C2.75 9.37 2.89 9.74 4.23 9.74H8.27C9.61 9.74 9.75 9.36 9.75 8.51V3.98C9.75 3.12 9.61 2.75 8.27 2.75H4.23Z"/>
            <path
                d="M8.27 22.75H4.23C2.22 22.75 1.25 21.77 1.25 19.77V15.73C1.25 13.72 2.23 12.75 4.23 12.75H8.27C10.28 12.75 11.25 13.73 11.25 15.73V19.77C11.25 21.77 10.27 22.75 8.27 22.75ZM4.23 14.25C3.05 14.25 2.75 14.55 2.75 15.73V19.77C2.75 20.95 3.05 21.25 4.23 21.25H8.27C9.45 21.25 9.75 20.95 9.75 19.77V15.73C9.75 14.55 9.45 14.25 8.27 14.25H4.23Z"
            />
          </svg>       
          
        </button>
      </div>
  );
};

export default CardView;