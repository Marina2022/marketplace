import s from './MobileSort.module.scss';
import {useSearchParams} from "react-router-dom";
import {sortOptions, sortOptionsMobile} from "@/consts/sortOptions.js";
import {useState} from "react";
import MobileSortItem from "@/components/CategoryBlock/Sort/MobileSort/MobileSortItem/MobileSortItem.jsx";

const MobileSort = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false)


  const sortColumn = searchParams.get('sortColumn')

  let sortOrder
  if (sortColumn) {
    sortOrder = searchParams.get('sortOrder')
    if (!sortOrder) {
      if (sortColumn === 'price') {
        sortOrder = 'asc'
      } else {
        sortOrder = 'desc'
      }
    }
  }

  const currentSort = sortOptions.find(item => item.sortColumn === sortColumn)

  let currentSortLabel
  if (currentSort) currentSortLabel = currentSort.label


  let imgClassName

  if (!sortColumn) {
    imgClassName = s.img
  } else if (sortOrder === 'desc') {
    imgClassName = s.imgDesc
  } else if (sortOrder === 'asc') {
    imgClassName = s.imgAsc
  }

  const onBtnClick = () => {
    setIsOpen(true)
  }

  return (
      <>
        <button onClick={onBtnClick} className={s.btn}>
          <svg className={imgClassName} width="14" height="15" viewBox="0 0 14 15" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.1055 5.02075H1.60547C1.3663 5.02075 1.16797 4.82242 1.16797 4.58325C1.16797 4.34409 1.3663 4.14575 1.60547 4.14575H12.1055C12.3446 4.14575 12.543 4.34409 12.543 4.58325C12.543 4.82242 12.3446 5.02075 12.1055 5.02075Z"
            />
            <path
                d="M8.60547 7.9375H1.60547C1.3663 7.9375 1.16797 7.73917 1.16797 7.5C1.16797 7.26083 1.3663 7.0625 1.60547 7.0625H8.60547C8.84464 7.0625 9.04297 7.26083 9.04297 7.5C9.04297 7.73917 8.84464 7.9375 8.60547 7.9375Z"
            />
            <path
                d="M3.9388 10.8542H1.60547C1.3663 10.8542 1.16797 10.6559 1.16797 10.4167C1.16797 10.1776 1.3663 9.97925 1.60547 9.97925H3.9388C4.17797 9.97925 4.3763 10.1776 4.3763 10.4167C4.3763 10.6559 4.17797 10.8542 3.9388 10.8542Z"
            />
          </svg>
          <span className={s.buttonText}>
          {
            sortColumn ? currentSortLabel : 'Популярные'
          }          
        </span>
        </button>

        {
            isOpen && <div>
              <div onClick={() => setIsOpen(false)} className={s.overlay}>]
                <div onClick={(e)=>e.stopPropagation()} className={s.modal}>
                  <ul className={s.list}>
                    {
                      sortOptionsMobile.map((item, i) => <MobileSortItem key={i} item={item}/>)
                    }
                  </ul>
                </div>
              </div>
            </div>
        }
      </>
  );
};

export default MobileSort;