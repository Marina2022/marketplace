import s from './CombineContextMenu.module.scss';
import {useEffect} from "react";

const CombineContextMenu = ({position}) => {
    
  if (!position) return null
  
  return (
    // <div className={s.combineContextMenu}  style={{top: position?.top - 20, left: position?.left + 22}} >
    <div className={s.combineContextMenu}  style={{top: position?.top - 20, left: position?.left + 26}} >
      
    </div>
  );
};

export default CombineContextMenu;