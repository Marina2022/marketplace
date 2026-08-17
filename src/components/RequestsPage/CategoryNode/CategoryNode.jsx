import s from './CategoryNode.module.scss';
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getOpenedBranchesInCats, setOpenedBranchesInCats, setRecentCategories} from "@/store/requestsSlice.js";

const CategoryNode = ({node, level = 1}) => {


  const openedBranches = useSelector(getOpenedBranchesInCats)
  const isOpen = openedBranches.some(branch => branch === node.id)

  const hasChildren = node.children && node.children.length > 0;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toggleOpen = (e) => {
    e.stopPropagation();
    let newOpenBranches

    if (!isOpen) {
      newOpenBranches = [...openedBranches, node.id]
    } else {
      newOpenBranches = openedBranches.filter(branch => branch !== node.id)
    }
    dispatch(setOpenedBranchesInCats(newOpenBranches))
  }

  const isFirstLevel = level === 1;

  const tabs = useSelector(getTabs)

  const handleClick = () => {

    if (node.isLeaf) {
      const url = `/requests/${node.slug}-${node.shortId}`
      const isInTabs = tabs.find((tab) => tab === url)
      navigate(url, {
        state: { fromApp: true }
      })

      if (!isInTabs) {
        const newTabs = [...tabs, url]
        dispatch(setTabs(newTabs))
      }

      const recentCategories = JSON.parse(
        localStorage.getItem("recent_categories") || "[]"
      )

      const filtered = recentCategories.filter(
        (item) => item.id !== node.id
      );
      filtered.push(node);
      const trimmed = filtered.slice(-5);
      localStorage.setItem("recent_categories", JSON.stringify(trimmed))
      dispatch(setRecentCategories(trimmed))
    }
  }

  return (
    <li
      onClick={handleClick}

      className={node.isLeaf ? s.lastItem : s.item}
      style={{
        fontSize: isFirstLevel ? 14 : 13,
        fontWeight: isFirstLevel ? 600 : "normal",
      }}
    >
      <div
        className={isOpen ? ` ${s.itemOpened}` : ` ${s.itemClosed}`}
        onClick={hasChildren ? toggleOpen : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {hasChildren && (
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
        )}

        <span>{node.name}</span>

      </div>

      {hasChildren && isOpen && (
        <ul style={{paddingLeft: '16px'}}>
          {node.children.map(child => (
            <CategoryNode key={child.id} node={child} level={level + 1}/>
          ))}
        </ul>
      )}
    </li>
  )
}

export default CategoryNode