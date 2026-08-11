import s from './RequestCategoryDropdownNew.module.scss';

import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import RequestSearchCats
  from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequestCategory/RequestCategoryDropdown/RequestSearchCats/RequestSearchCats.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import CategoryNodeEditRequest
  from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequestCategory/RequestCategoryDropdownNew/CategoryNodeEditRequest/CategoryNodeEditRequest.jsx";
import {getOpenedCategoryIds} from "@/utils/requests.js";
import {useSelector} from "react-redux";
import {getRequestsTree} from "@/store/requestsSlice.js";


const RequestCategoryDropdownNew = ({
                                      cats,
                                      setValue,
                                      setEditing,
                                      searchCats,
                                      setSearchCats,
                                      setSelectedCatName,
                                      isDirty,
                                      treeLoading,
                                      selectedCats,
                                      setSelectedCats
                                    }) => {

  const selectedCatsName = selectedCats.map(cat => cat.name).join(', ')

  const tree = useSelector(getRequestsTree)
  const openedBranchesInitial = getOpenedCategoryIds(selectedCats, tree)

  const [openBranches, setOpenBranches] = useState(openedBranchesInitial)

  const submitCategory = (e) => {
    e.stopPropagation()
    if (!selectedCats) return
    setValue(selectedCats)
    setEditing(false)
    setSelectedCatName(selectedCatsName)
    isDirty.current = true
  }

  if (treeLoading) return (
    <div className={s.catsDropdown}>
      <RequestSearchCats
        searchCats={searchCats}
        setSearchCats={setSearchCats}
      />
      <MiniSpinner/>
    </div>
  )

  return (
    <div className={s.catsDropdown}>
      <RequestSearchCats
        searchCats={searchCats}
        setSearchCats={setSearchCats}
      />

      <div className={`${s.content} scroll`}>
        <ul className={s.list}>
          {cats.map(rootNode => (
            <CategoryNodeEditRequest
              key={rootNode.id}
              node={rootNode}
              openBranches={openBranches}
              setOpenBranches={setOpenBranches}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
            />
          ))}
        </ul>
      </div>
      <div className={s.dropdownFooter}>
        <div className={s.footerLeft}>
          Если категории вашего товара не существует, отправьте заявку
        </div>
        <Button onClick={submitCategory} className={s.btn} type="button">
          {
            selectedCats.length > 0 ? "Добавить категории" : "Обновить категории"
          }
        </Button>
      </div>
    </div>
  )
}

export default RequestCategoryDropdownNew;