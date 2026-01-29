import s from './CategoryDropdownDesktop.module.scss';
import {useState} from "react";
import ProductCategoryList
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/ProductCategoryList/ProductCategoryList.jsx";
import RequestCategoryList
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/RequestCategoryList/RequestCategoryList.jsx";
import ProductSubcategories
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/ProductSubcategories/ProductSubcategories.jsx";
import RequestSubcategories
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/RequestSubcategories/RequestSubcategories.jsx";



const CategoryDropdownDesktop = ({
                                   setCategoryDropdownOpen,
                                   categoriesForDropdown,
                                   requestsForDropdown,
                                   categoriesForDropdownLoading,
                                   requestsForDropdownLoading
                                 }) => {

  const [catalogType, setCatalogType] = useState('products')  // products/requests
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)

  const handleTriggerClick = () => {
    setTypeDropdownOpen(true)
  }
  const dropdownArray = [
    {label: "Каталог товаров", value: "products"},
    {label: "Каталог заявок", value: "requests"},
  ]

  const [currentProductCat, setCurrentProductCat] = useState(null)
  const [currentRequestCat, setCurrentRequestCat] = useState(null)

  return (
    <div className={s.categoryDropdown}>
      <div className="container">
        <div className={s.globalWrapper}>
          <button className={s.closeBtn} onClick={()=>setCategoryDropdownOpen(false)}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.330758 0.331352C0.770106 -0.107882 1.48244 -0.107953 1.92175 0.331352L6.69334 5.10294L11.4663 0.329971C11.9056 -0.109326 12.6179 -0.109241 13.0573 0.329971C13.4966 0.769311 13.4966 1.48162 13.0573 1.92096L8.28433 6.69393L13.0587 11.4683C13.498 11.9076 13.4979 12.6199 13.0587 13.0593C12.6193 13.4986 11.907 13.4986 11.4677 13.0593L6.69334 8.28492L1.92037 13.0579C1.48103 13.4972 0.768717 13.4972 0.329377 13.0579C-0.109835 12.6185 -0.10992 11.9062 0.329377 11.4669L5.10235 6.69393L0.330758 1.92234C-0.108582 1.483 -0.108582 0.770692 0.330758 0.331352Z" fill="#3E5067"/>
          </svg>
          </button>
          <div className={s.leftPart}>
            <div className={s.dropdownWrapper}>
              <div className={s.trigger} onClick={handleTriggerClick}>
                <span>
                  {
                    catalogType === 'products' ? 'Каталог товаров' : 'Каталог заявок'
                  }
                </span>
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5.77833 5.73167C5.31167 5.73167 4.845 5.55167 4.49167 5.19833L0.145 0.851666C-0.0483333 0.658333 -0.0483333 0.338333 0.145 0.145C0.338333 -0.0483333 0.658333 -0.0483333 0.851667 0.145L5.19833 4.49167C5.51833 4.81167 6.03833 4.81167 6.35833 4.49167L10.705 0.145C10.8983 -0.0483333 11.2183 -0.0483333 11.4117 0.145C11.605 0.338333 11.605 0.658333 11.4117 0.851666L7.065 5.19833C6.71167 5.55167 6.245 5.73167 5.77833 5.73167Z"
                    fill="#658092"/>
                </svg>
              </div>
              {
                typeDropdownOpen && (
                  <div className={s.typeDropdown}>
                    <button className={s.svgUpBtn} onClick={() => setTypeDropdownOpen(false)}>
                      <svg width="12" height="6"
                           viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.77831 0.000755775C6.24497 0.000755775 6.71164 0.180755 7.06497 0.534088L11.4116 4.88076C11.605 5.07409 11.605 5.39409 11.4116 5.58742C11.2183 5.78076 10.8983 5.78076 10.705 5.58742L6.35831 1.24076C6.03831 0.920755 5.51831 0.920755 5.19831 1.24076L0.851641 5.58742C0.658308 5.78076 0.338307 5.78076 0.144973 5.58742C-0.0483599 5.39409 -0.0483599 5.07409 0.144973 4.88076L4.49164 0.534088C4.84497 0.180755 5.31164 0.000755775 5.77831 0.000755775Z"
                          fill="#658092"/>
                      </svg>
                    </button>
                    {
                      dropdownArray.map((item, i) => {
                        const handleItemClick = (item) => {
                          setCatalogType(item.value)
                          setTypeDropdownOpen(false)
                        }

                        return (
                          <div key={i} className={s.typeDropdownItem} onClick={() => handleItemClick(item)}>
                            {item.label}
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>

            {
              catalogType === 'products' && <ProductCategoryList
                setCurrentProductCat={setCurrentProductCat}
                categoriesForDropdown={categoriesForDropdown}
                categoriesForDropdownLoading={categoriesForDropdownLoading}
                currentProductCat={currentProductCat}
              />
            }

            {
              catalogType === 'requests' && <RequestCategoryList
                requestsForDropdown={requestsForDropdown}
                currentRequestCat={currentRequestCat}
                setCurrentRequestCat={setCurrentRequestCat}
                requestsForDropdownLoading={requestsForDropdownLoading}
              />
            }
          </div>

          <div className={s.middlePart}></div>

          <div className={s.rightPart}>

            {
              catalogType === 'products' && <ProductSubcategories currentProductCat={currentProductCat} />
            }

            {
              catalogType === 'requests' && <RequestSubcategories currentRequestCat={currentRequestCat}/>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryDropdownDesktop;