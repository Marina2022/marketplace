import s from './SearchKeywordsPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getRequestsTree, getRequestsTreeLoading, getTagsSelected, setTagsSelected} from "@/store/requestsSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {buildCategoryTree, buildGroupedTags} from "@/utils/requests.js";
import CategoryNodeKeyWords from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryNodeKeyWords.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import CategoryGroup from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryGroup/CategoryGroup.jsx";
import TopTagsLineMobile from "@/components/SearchKeywordsPage/TopTagsLineMobile/TopTagsLineMobile.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import MobileTagsBlock from "@/components/SearchKeywordsPage/MobileTagsBlock/MobileTagsBlock.jsx";

const SearchKeywordsPage = () => {

  const tree = useSelector(getRequestsTree)
  const loading = useSelector(getRequestsTreeLoading)
  const tagsSelected = useSelector(getTagsSelected)
  const groupedTags = buildGroupedTags(tagsSelected, tree)
  const dispatch = useDispatch()

  const handleClearAll = () => {
    dispatch(setTagsSelected([]))
  }

  const location = useLocation()

  const navigate = useNavigate()
  const [mobileTagsBlockOpen, setMobileTagsBlockOpen] = useState(false)

  const handleClickBack = () => {
    if (location.state?.fromApp) {
      navigate(-1, {
        state: { fromApp: true }
      });
    } else {
      navigate('/');
    }
  }
  if (loading) {
    return <Spinner/>
  }

  return (
    <div className={s.searchKeywordsPageWrapper}>
      <div className={s.mobileHeader}>
        <button onClick={handleClickBack}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="4" fill="#F7F8FB"/>
            <path d="M21 24L15 18L21 12" stroke="#131D2A" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </button>
        <span>Поиск по ключевым</span>
      </div>

      {
        tagsSelected.length > 0 &&
        <TopTagsLineMobile groupedTags={groupedTags} setMobileTagsBlockOpen={setMobileTagsBlockOpen}/>
      }
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
      {
        mobileTagsBlockOpen &&
        <MobileTagsBlock
          groupedTags={groupedTags}
          tagsSelected={tagsSelected}
          setTagsSelected={setTagsSelected}
          setMobileTagsBlockOpen={setMobileTagsBlockOpen}
        />
      }
    </div>
  )
}

export default SearchKeywordsPage;
