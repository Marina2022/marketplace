import s from './SearchKeywordsPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getRequestsTree, getRequestsTreeLoading, getTagsSelected, setTagsSelected} from "@/store/requestsSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {buildCategoryTree, buildGroupedTags} from "@/utils/requests.js";
import CategoryNodeKeyWords from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryNodeKeyWords.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import CategoryGroup from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryGroup/CategoryGroup.jsx";

const SearchKeywordsPage = () => {

  const tree = useSelector(getRequestsTree)
  const loading = useSelector(getRequestsTreeLoading)
  const tagsSelected = useSelector(getTagsSelected)
  const groupedTags = buildGroupedTags(tagsSelected, tree)
  const dispatch = useDispatch();

  const handleClearAll = () => {
    dispatch(setTagsSelected([]))
  }

  if (loading) {
    return <Spinner/>
  }

  return (
    <div className={s.searchKeywordsPage}>
      <ul className={`${s.leftBlock} scroll`}>
        {buildCategoryTree(tree).map(rootNode => (
          <CategoryNodeKeyWords key={rootNode.id} node={rootNode}/>
        ))}
      </ul>

      <div className={s.rightBlock}>
        <div className={s.rightBlockHeader}>
          <div>Выбрано тегов</div>

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
        <div className={`${s.rightBlockContent} scroll`}>

          <ul className={s.catGroups}>
            {
              groupedTags.map((catGroup) => <CategoryGroup catGroup={catGroup} key={catGroup.catId}/>)
            }
          </ul>
        </div>
        <div className={s.rightBlockFooter}>
          <Button className={s.btnBlack} black>Найти заявки</Button>
          <button onClick={handleClearAll} className={s.transparentBtn}>Сбросить все</button>
        </div>
      </div>
    </div>
  )
}

export default SearchKeywordsPage;
