import s from './CategoryNodeEditRequest.module.scss';
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";

const CategoryNodeEditRequest = ({ node, level = 1 , openBranches, setOpenBranches, selectedCats, setSelectedCats}) => {

  const isOpen = openBranches.some(branch => branch === node.id)
  const hasChildren = node.children && node.children.length > 0;

  const toggleOpen = (e) => {
    e.stopPropagation();
    let newOpenBranches

    if (!isOpen) {
      newOpenBranches = [...openBranches, node.id]
    } else {
      newOpenBranches = openBranches.filter(branch => branch !== node.id)
    }
    setOpenBranches(newOpenBranches)
  }

  const isFirstLevel = level === 1;

  const isSelected = selectedCats.find(cat=>cat.id === node.id)

  const handleClick = () => {
    if (node.isLeaf) {

      if (isSelected) {
        setSelectedCats(selectedCats.filter(cat=>cat.id !== node.id))
      } else {
        // не даем выбирать более 3х категорий
        if (selectedCats.length >=3) {
          showErrorToast("Можно выбрать не более трех категорий")

        } else {
          setSelectedCats([...selectedCats, {id: node.id, name: node.name}])
        }
      }
    }
  }

  return (
    <li
      onClick={handleClick}

      className={node.isLeaf ?  s.lastItem : s.item}
      style={{
        fontSize: isFirstLevel ? 14 : 13,
        fontWeight: isFirstLevel ? 600 : "normal",
        outline: isSelected ? '1px solid #D1DCE8' : 'none',
      }}
    >
      <div
        className={isOpen ? ` ${s.itemOpened}`: ` ${s.itemClosed}`}
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
              <svg className={s.minusIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15" stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              : <svg className={s.plusIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V15M15 12H9" stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          }</span>
        )}

        <span>{node.name}</span>

      </div>

      {hasChildren && isOpen && (
        <ul style={{ paddingLeft: '16px'}}>
          {node.children.map(child => (
            <CategoryNodeEditRequest
              key={child.id}
              node={child}
              level={level + 1}
              openBranches={openBranches}
              setOpenBranches={setOpenBranches}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default CategoryNodeEditRequest