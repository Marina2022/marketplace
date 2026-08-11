import s from './EditRequestCategory.module.scss';
import {useState} from "react";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {buildCategoryTree} from "@/utils/requests.js";
import RequestCategoriesModalOnMobile
  from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequestCategory/RequestCategoriesModalOnMobile/RequestCategoriesModalOnMobile.jsx";
import {useSelector} from "react-redux";
import {getRequestsTree, getRequestsTreeLoading} from "@/store/requestsSlice.js";
import RequestCategoryDropdownNew
  from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequestCategory/RequestCategoryDropdownNew/RequestCategoryDropdownNew.jsx";


const EditRequestCategory = ({
                               setValue,
                               isError,
                               isDirty,
                               setErrors,
                               catIds
                             }) => {
  const [catsLoading, setCatsLoading] = useState(true)
  // const [cats, setCats] = useState(null)
  const [selectedCatName, setSelectedCatName] = useState(null)
  const [searchCats, setSearchCats] = useState('')

  const tree = useSelector(getRequestsTree)
  const treeLoading = useSelector(getRequestsTreeLoading) // можно без учета загрузки наверное
  const cats = buildCategoryTree(tree)


  let selectedCatsInitial = []
  catIds.forEach(catId => {
    if (tree.find(node => node.id === catId)) {
      selectedCats.push(catId)
    }
  })

  const [selectedCats, setSelectedCats] = useState(selectedCatsInitial)



  // (catIds - это массив выбранных категори (не просто отмеченных), а setValue - ее подтверждение выбора отмеченных)

  // useEffect(() => {
  //   const getCats = async () => {
  //     try {
  //       setCatsLoading(true)
  //
  //       let url = `/request-categories/tree`
  //       if (searchCats) url += `?searchTerms=${searchCats}`
  //       const response = await axiosInstance(url)
  //       setCats(response.data.requestCategories)
  //       const selectedCat = findSubCategoryById(response.data.requestCategories, catId)
  //       if (selectedCat) {
  //         setSelectedCatName(selectedCat.subCategoryName)
  //       }
  //     } catch (err) {
  //       console.log(err)
  //     } finally {
  //       setCatsLoading(false)
  //     }
  //   }
  //   getCats()
  // }, [catId, searchCats]);

  const isMobile = useMobileScreen()
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    setEditing(prev => !prev)
    setErrors(prev => ({
      ...prev,
      catIds: false
    }))
  }

  const handleBlur = (e) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setEditing(false)
  }

  const handleClear = ()=>{
    setValue([])
    setSelectedCats([])
    setSelectedCatName(null)
  }

  if (!cats) return null

  console.log("catIds = ", catIds)

  return (
    <div className={s.wrapper} tabIndex={0} onBlur={handleBlur}>
      {
        selectedCats.length > 0 && <button className={s.clearBtn} type="button" onClick={handleClear}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="5.11137" y1="5.11092" x2="12.8895" y2="12.8891" stroke="#658092"/>
            <line x1="5.10738" y1="12.8891" x2="12.8856" y2="5.11089" stroke="#658092"/>
          </svg>
        </button>
      }

      <div className={editing ? s.catInputBordered : isError ? s.catInputError : s.catInput} onClick={handleClick}>
        <span className={s.catName}>
          {
            catIds.length > 0 && selectedCatName
          }
        </span>

        {
          !catIds.length && <div className={s.empty}>
            <span>Категория заявки</span>
            <span className={s.requiredStar}>*</span>
          </div>
        }
      </div>

      {editing && !isMobile && <RequestCategoryDropdownNew
        catsLoading={catsLoading}
        searchCats={searchCats}
        setSearchCats={setSearchCats}
        cats={cats}
        setValue={setValue}
        setEditing={setEditing}
        setSelectedCatName={setSelectedCatName}
        isDirty={isDirty}
        treeLoading={treeLoading}
        selectedCats={selectedCats}
        setSelectedCats={setSelectedCats}
      />}


      {editing && isMobile && (
        <RequestCategoriesModalOnMobile setEditing={setEditing}>

          <RequestCategoryDropdownNew
            catsLoading={catsLoading}
            searchCats={searchCats}
            setSearchCats={setSearchCats}
            cats={cats}
            setValue={setValue}
            setEditing={setEditing}
            setSelectedCatName={setSelectedCatName}
            isDirty={isDirty}
            treeLoading={treeLoading}
            setSelectedCats={setSelectedCats}
            selectedCats={selectedCats}
          />

        </RequestCategoriesModalOnMobile>
      )}

      {
        isError && <div className={s.errorMessage}>Выберите категорию</div>
      }
    </div>
  )
}

export default EditRequestCategory;

