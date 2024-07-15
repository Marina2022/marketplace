import dropdownBtn from '@/assets/img/dropdownBtn.svg'

import s from './CollapsableTab.module.scss';
import {useEffect, useRef} from "react";

const CollapsableTab = ({
                          children,
                          ClosedStateComponent,
                          product,
                          setTabIsOpen,
                          tabIsOpen,
                          ifAllTab,
                          setMobileReviewsTabIsOpen,
                          setMobileQuestionsTabIsOpen
                        }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (tabIsOpen && ref.current && !ifAllTab) {      
        //ref.current.scrollIntoView({behavior: 'smooth'});

      const top = ref.current.getBoundingClientRect().top;

      window.scrollBy({
        top: top - 100,
        behavior: 'smooth' 
      });
        
        
    }
  }, [tabIsOpen, ref.current]);

  const toggleBtnHandler = () => {
    if (ifAllTab) {

      if (!tabIsOpen) {
        setTabIsOpen(true)
      } else {
        setMobileReviewsTabIsOpen(false)
        setMobileQuestionsTabIsOpen(false)
        setTabIsOpen(false)
      }


    } else {
      setTabIsOpen(prev => !prev)
    }

  }

  return (
    <div className={s.wrapper} ref={ref}>
      <div>
        <button onClick={toggleBtnHandler} className={tabIsOpen ? s.openBtnActive : s.openBtn}><img src={dropdownBtn}
                                                                                                    alt="dropdown button"/>
        </button>
        {
          // !tabIsOpen && <ClosedStateComponent  />
          !tabIsOpen && ClosedStateComponent({product: product})
        }
      </div>

      {
        tabIsOpen && children
      }

    </div>
  );
};

export default CollapsableTab;