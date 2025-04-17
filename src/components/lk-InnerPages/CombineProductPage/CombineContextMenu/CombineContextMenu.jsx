import s from './CombineContextMenu.module.scss';
import {useRef, useState} from "react";

const CombineContextMenu = ({position, values, currentValueLabel, productToMerge, setMenuOpen}) => {

  console.log('values', values)
  
  const innerContainerRef = useRef()

  // currentValueLabel - по label надо найти в атрибутах нужный объект с опцией! Хотяя.. можно и чисто Label найти, для галочки-то сойдет
  const handleSelectValue = async (e, selectedValue) => {
    // запрос на апдейт с новым selectedValue, собираем в т.ч. из productToMerge
    e.stopPropagation()
    setMenuOpen(false)
  }
  
  const [heightIsSmall, setHeightIsSmall] = useState(false)
  const handleListMount = (node)=>{
    if (!node) return
    
    const height = node.getBoundingClientRect().height
        
    if (height > 190) {
      setHeightIsSmall(false)      
    } else {
      setHeightIsSmall(true)
    }
  }

  if (!position) return null


  return (
    <div className={s.combineContextMenu} style={{top: position?.top - 20, left: position?.left + 26}}>
      <div ref={innerContainerRef} className={`${s.innerContainer} ${heightIsSmall ? s.innerContainerNoPadding : ''} lk-scroll`}>
        <ul className={s.list} ref={(node)=>handleListMount(node)}>
          {
            values.map((valueItem, i) => {
              return (

                <li className={`${s.valueItem} ${heightIsSmall ? s.valueItem100 : ''}`} 
                    key={i}
                    onClick={(e) => handleSelectValue(e, valueItem.optionValueId || valueItem.typeId || valueItem.brandId)}>{valueItem.optionValue || valueItem.typeName || valueItem.brandName}</li>
              )
            })
          }


        </ul>

      </div>

    </div>
  );
};

export default CombineContextMenu;