import s from './CategoryNodeKeyWords.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getOpenedBranchesInKeySearch, setOpenedBranchesInKewSearch} from "@/store/requestsSlice.js";
import TagInCats from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/TagInCats/TagInCats.jsx";

const CategoryNodeKeyWords = ({node, level = 1}) => {
  const openedBranches = useSelector(getOpenedBranchesInKeySearch)
  const isOpen = openedBranches.some(branch => branch === node.id)
  const hasChildren = node.children && node.children.length > 0;
  const dispatch = useDispatch()

  const toggleOpen = (e) => {
    e.stopPropagation();
    let newOpenBranches

    if (!isOpen) {
      newOpenBranches = [...openedBranches, node.id]
    } else {
      newOpenBranches = openedBranches.filter(branch => branch !== node.id)
    }
    dispatch(setOpenedBranchesInKewSearch(newOpenBranches))
  }

  const isFirstLevel = level === 1;

  return (
    <li
      className={s.item}
      style={{
        fontSize: isFirstLevel ? 14 : 13,
        fontWeight: isFirstLevel ? 600 : "normal",
      }}
    >
      <div
        className={isOpen ? ` ${s.itemOpened}` : ` ${s.itemClosed}`}
        onClick={toggleOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
          <span>{
            isOpen ?
              <svg className={s.minusIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15" stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              : <svg className={s.plusIcon} width="24" height="24" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V15M15 12H9" stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }</span>
        <span>{node.name}</span>
      </div>

      {hasChildren && isOpen && (
        <ul style={{paddingLeft: '16px'}}>
          {node.children.map(child => (
            <CategoryNodeKeyWords key={child.id} node={child} level={level + 1}/>
          ))}
        </ul>
      )}
      {
        node.isLeaf && node.tags.length > 0 && isOpen && (
          <div className={s.tagsBlock}>

            <ul className={s.tagsList}>
              {
                node.tags.map((tag) => <TagInCats tag={tag} key={tag.id}/>)
              }
            </ul>
          </div>
        )
      }
    </li>
  )
}

export default CategoryNodeKeyWords