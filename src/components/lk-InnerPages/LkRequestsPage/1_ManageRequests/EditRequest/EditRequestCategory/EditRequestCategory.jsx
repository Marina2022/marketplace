import s from './EditRequestCategory.module.scss';
import {useEffect, useState} from "react";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import axiosInstance from "@/api/axiosInstance.js";
import {findSubCategoryById} from "@/utils/lkRequests.js";
import RequestCategoryDropdown
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestCategory/RequestCategoryDropdown/RequestCategoryDropdown.jsx";
import RequestCategoriesModalOnMobile
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestCategory/RequestCategoriesModalOnMobile/RequestCategoriesModalOnMobile.jsx";

const EditRequestCategory = ({
                               catId,
                               setValue,
                               isError,
                               isDirty
                             }) => {
  const [catsLoading, setCatsLoading] = useState(true)
  const [cats, setCats] = useState(null)
  const [selectedCatName, setSelectedCatName] = useState("")
  const [searchCats, setSearchCats] = useState('')

  useEffect(() => {
    const getCats = async () => {
      try {
        setCatsLoading(true)

        let url = `/request-categories-tree`
        if (searchCats) url += `?searchTerms=${searchCats}`
        const response = await axiosInstance(url)
        setCats(response.data.requestCategories)
        const selectedCat = findSubCategoryById(response.data.requestCategories, catId)
        if (selectedCat) {
          setSelectedCatName(selectedCat.subCategoryName)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setCatsLoading(false)
      }
    }
    getCats()
  }, [catId, searchCats]);

  const isMobile = useMobileScreen()
  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    setEditing(prev => !prev)
    // setErrors - ''
  }

  const handleBlur = (e) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setEditing(false)
  }

  if (!cats) return null

  return (

    <div className={s.wrapper} tabIndex={0} onBlur={handleBlur}>
      <div className={editing ? s.catInputBordered : isError ? s.catInputError : s.catInput} onClick={handleClick}>
        <span className={s.catName}>
          {
            catId && selectedCatName
          }
        </span>

        {
          !catId && <div className={s.empty}>
            <span>Категория заявки</span>
            <span className={s.requiredStar}>*</span>
          </div>
        }
      </div>

      {editing && !isMobile && <RequestCategoryDropdown
        catsLoading={catsLoading}
        searchCats={searchCats}
        setSearchCats={setSearchCats}
        cats={cats}
        setValue={setValue}
        catId={catId}
        setEditing={setEditing}
        setSelectedCatName={setSelectedCatName}
        isDirty={isDirty}
      />}


      {editing && isMobile && <RequestCategoriesModalOnMobile setEditing={setEditing}>
        <RequestCategoryDropdown
          catsLoading={catsLoading}
          searchCats={searchCats}
          setSearchCats={setSearchCats}
          cats={cats}
          setValue={setValue}
          catId={catId}
          setEditing={setEditing}
          setSelectedCatName={setSelectedCatName}
          isDirty={isDirty}
        />
      </RequestCategoriesModalOnMobile>
      }


    </div>
  )
}

export default EditRequestCategory;

