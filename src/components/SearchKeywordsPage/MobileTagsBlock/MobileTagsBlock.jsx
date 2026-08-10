import s from './MobileTagsBlock.module.scss';
import {useDispatch} from "react-redux";
import CategoryGroup from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryGroup/CategoryGroup.jsx";
import Button from "@/components/ui/Button/Button.jsx";

const MobileTagsBlock = ({tagsSelected, groupedTags, setTagsSelected, setMobileTagsBlockOpen}) => {

  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(setTagsSelected([]))
  }

  return (
    <div className={s.mobileTagsBlockWrapper} onClick={() => setMobileTagsBlockOpen(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${s.mobileTagsBlock} scroll`}>
        <div className={s.line}></div>
        <div className={s.tagsChosen}>
          <div className={s.selectedTags}>
            <div className={s.selectedText}>Выбрано тегов</div>
            {
              tagsSelected.length === 0 && "-"
            }

            {
              tagsSelected.length > 0 && (
                <div className={s.circle}>
                  {
                    tagsSelected.length
                  }
                </div>
              )
            }
          </div>
          <button onClick={handleClearAll} className={s.transparentBtn}>Сбросить</button>
        </div>
        {
          groupedTags.length > 0 && (
            <ul className={s.catGroups}>
              {
                groupedTags.map((catGroup) => <CategoryGroup catGroup={catGroup} key={catGroup.catId}/>)
              }
            </ul>
          )
        }
        <div className={s.bottomBlock}>
          <Button className={s.btnBlack} black>Найти заявки</Button>
        </div>
      </div>
    </div>
  )
}

export default MobileTagsBlock;