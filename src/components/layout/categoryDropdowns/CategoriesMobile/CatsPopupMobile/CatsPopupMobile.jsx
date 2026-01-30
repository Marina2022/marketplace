import s from './CatsPopupMobile.module.scss';
import {useEffect, useRef, useState} from "react";
import ProductCatsList
  from "@/components/layout/categoryDropdowns/CategoriesMobile/CatsPopupMobile/ProductCatsList/ProductCatsList.jsx";
import RequestCatsList
  from "@/components/layout/categoryDropdowns/CategoriesMobile/CatsPopupMobile/RequestCatsList/RequestCatsList.jsx";
import ProductCatsFinalLinks
  from "@/components/layout/categoryDropdowns/CategoriesMobile/CatsPopupMobile/ProductCatsFinalLinks/ProductCatsFinalLinks.jsx";
import RequestCatsFinalLinks
  from "@/components/layout/categoryDropdowns/CategoriesMobile/CatsPopupMobile/RequestCatsFinalLinks/RequestCatsFinalLinks.jsx";

const CatsPopupMobile = ({
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
  const [currentProductSubCat, setCurrentProductSubCat] = useState(null)
  const [currentRequestCat, setCurrentRequestCat] = useState(null)

  console.log('currentProductCat', currentProductCat)

  useEffect(() => {
    setCurrentProductCat(null)
    setCurrentRequestCat(null)
    setCurrentProductSubCat(null)
  }, [catalogType]);

  const dropdownWrapperRef = useRef()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(e.target)
      ) {
        setTypeDropdownOpen(false);
      }
    };

    if (typeDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [typeDropdownOpen]);

  console.log('currentRequestCat = ', currentRequestCat)

  return (
    <div className={s.catsPopup}>

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
            <div className={s.typeDropdown} ref={dropdownWrapperRef} >
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

      {/*тип категорий = Товары, категория не выбрана*/}
      {
        catalogType === "products" && !currentProductCat && <ProductCatsList
          setCurrentProductCat={setCurrentProductCat}
          categoriesForDropdown={categoriesForDropdown}
          categoriesForDropdownLoading={categoriesForDropdownLoading}
          currentProductCat={currentProductCat}
        />
      }

      {/* тип категорий = Товары, категория выбрана */}
      {
        catalogType === "products" && currentProductCat && !currentProductSubCat && <ProductCatsList
          setCurrentProductCat={setCurrentProductSubCat}
          setCurrentProductCatReally={setCurrentProductCat}
          categoriesForDropdown={currentProductCat.subCategories}
          currentProductCat={currentProductCat}
          isSubCatsList={true}
        />
      }

      {/* тип категорий = Товары, категория выбрана и субкатегория выбрана */}
      {
        catalogType === "products" && currentProductSubCat && <ProductCatsFinalLinks
          finalLinks={currentProductSubCat.productCategories}
          currentProductSubCat={currentProductSubCat}
          setCurrentProductSubCat={setCurrentProductSubCat}
        />
      }


      {/* -------------------------------- */}


      {/* тип категорий = Заявка, категория не выбрана  */}
      {
        catalogType === "requests" && !currentRequestCat && <RequestCatsList
          requestsForDropdown={requestsForDropdown}
          currentRequestCat={currentRequestCat}
          setCurrentRequestCat={setCurrentRequestCat}
          requestsForDropdownLoading={requestsForDropdownLoading}
        />
      }

      {/* тип категорий = Заявка, категория выбрана  */}
      {
        catalogType === "requests" && currentRequestCat && <RequestCatsFinalLinks
          currentRequestCat={currentRequestCat}
          setCurrentRequestCat={setCurrentRequestCat}
          finalLinks={currentRequestCat.subCategories}
        />
      }


    </div>
  );
};

export default CatsPopupMobile;