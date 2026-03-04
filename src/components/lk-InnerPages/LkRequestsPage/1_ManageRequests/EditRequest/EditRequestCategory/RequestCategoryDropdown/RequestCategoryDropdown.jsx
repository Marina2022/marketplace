import s from './RequestCategoryDropdown.module.scss';

import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import {findProductCategoryName} from "@/utils/lkShop.js";
import RequestMainCategory
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestCategory/RequestMainCategory/RequestMainCategory.jsx";
import RequestSearchCats
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestCategory/RequestCategoryDropdown/RequestSearchCats/RequestSearchCats.jsx";

const RequestCategoryDropdown = ({cats, setValue, catId, setEditing, searchCats, setSearchCats, setSelectedCatName}) => {

  const [selectedCatId, setSelectedCatId] = useState(catId)

  const submitCategory = (e) => {
    e.stopPropagation()
    if (!selectedCatId) return
    setValue(selectedCatId)
    setEditing(false)
    setSelectedCatName(findProductCategoryName(cats, selectedCatId))
  }
    
  return (
    <div className={s.catsDropdown}>      
      <RequestSearchCats
        searchCats={searchCats}
        setSearchCats={setSearchCats}
      />

      <div className={`${s.content} lk-scroll`}>
        <ul>
          {
            cats.map((cat) => <RequestMainCategory
              key={cat.categoryId}
              cat={cat}
              searchCats={searchCats}
              selectedCatId={selectedCatId}
              setSelectedCatId={setSelectedCatId}
            />)
          }
        </ul>
      </div>
      <div className={s.dropdownFooter}>
        <div className={s.footerLeft}>
          Если категории вашего товара не существует, отправьте заявку
        </div>
        <Button onClick={submitCategory} className={s.btn} type="button">Добавить категорию</Button>
      </div>
    </div>
  );
};

export default RequestCategoryDropdown;