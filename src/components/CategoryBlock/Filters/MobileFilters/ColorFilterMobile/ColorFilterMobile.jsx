import s from './ColorFilterMobile.module.scss';
import ShowMoreModal from "@/components/CategoryBlock/Filters/MobileFilters/ShowMoreModal/ShowMoreModal.jsx";
import {useState} from "react";

const ColorFilterMobile = ({filter}) => {

  const {filterName} = filter

  const [showMoreIsOpen, setShowMoreIsOpen] = useState(false)
  
  return (
      <li className={s.filterItem}>
        <div className={s.topWrapper}>
          <h2 className={s.title}>{filterName}</h2>

          <button className={s.btn} onClick={() => {
            setShowMoreIsOpen(true)
          }}>Показать все
          </button>
        </div>


        {
          <ShowMoreModal setIsOpen={setShowMoreIsOpen} isOpen={showMoreIsOpen} title={filter.filterName} >
            <p>hellop</p>
            <p>hellop</p>
            <p>hellop</p>
            <p>hellop</p>
            <p>hellop</p>
          </ShowMoreModal>

        }
      </li>
  )
};

export default ColorFilterMobile;