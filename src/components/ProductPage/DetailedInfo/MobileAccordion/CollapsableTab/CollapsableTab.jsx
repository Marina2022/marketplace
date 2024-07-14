import dropdownBtn from '@/assets/img/dropdownBtn.svg'

import s from './CollapsableTab.module.scss';
import {useState} from "react";

const CollapsableTab = ({children, ClosedStateComponent}) => {
  const [tabIsOpen, setTabIsOpen] = useState(false)

  const toggleBtnHandler = () => {
    setTabIsOpen(prev => !prev)
  }

  return (
    <div className={s.wrapper}>
      <div>
        <button onClick={toggleBtnHandler} className={tabIsOpen ? s.openBtnActive : s.openBtn}><img src={dropdownBtn} alt="dropdown button"/>
        </button>
        {
          !tabIsOpen && <ClosedStateComponent  />
        }
      </div>

      {
        tabIsOpen && children
      }

    </div>
  );
};

export default CollapsableTab;