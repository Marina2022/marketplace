import s from "./RightPanelContent.module.scss";
import BrowserPanel
  from "@/pages/Lk/LkMenus/LkRightSideMenuItem/RightPanelContent/panels/BrowserPanel/BrowserPanel.jsx";
import {useState} from "react";

const RightPanelContent = ({currentRightPanelItem, collapse}) => {

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className={s.rightPanel}>

      <div className={s.header}>
        <div className={s.heading}>{currentRightPanelItem.heading}</div>

        <button className={s.dropdownBtn}>
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.76039 3.11677C1.58265 2.95834 1.29944 2.96193 1.12692 3.12454C0.954386 3.28716 0.958292 3.54782 1.13538 3.70625L4.70251 6.88262L5.01501 6.58788L4.70251 6.88382C4.8809 7.04225 5.16476 7.03806 5.33729 6.87485C5.34249 6.87007 5.34705 6.86528 5.35161 6.8605L8.86405 3.70625C9.04179 3.54782 9.04569 3.28716 8.87316 3.12454C8.70063 2.96193 8.41677 2.95774 8.23969 3.11677L5.01371 6.01395L1.76039 3.11677Z"
              fill="#AAB7BF"/>
          </svg>
        </button>


        <button className={s.pinBtn}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3548_36201)">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M3.33899 0.238895L8.66303 0.239303C8.74618 0.23917 8.81413 0.307126 8.81414 0.390409L8.81402 2.20337C8.81416 2.28665 8.74622 2.3546 8.663 2.35439L8.1477 2.3545L8.14761 4.74409C9.42542 5.48577 10.2852 6.86854 10.2851 8.45189C10.2853 8.48877 10.2847 8.52537 10.2837 8.56204C10.2803 8.69732 10.291 8.68579 10.157 8.68578L6.77474 8.68561L6.00091 14.4853L5.2282 8.6856L1.84108 8.68557C1.70587 8.68542 1.72216 8.69039 1.71877 8.55414C1.71801 8.52024 1.71753 8.48591 1.71746 8.45146C1.71738 6.86825 2.577 5.48514 3.85473 4.74374L3.85468 2.35429L3.33917 2.35433C3.25616 2.35432 3.1882 2.28637 3.18806 2.20322L3.18783 0.390054C3.18803 0.306839 3.25598 0.238891 3.33899 0.238895Z"
                    fill="#658092"/>
            </g>
            <defs>
              <clipPath id="clip0_3548_36201">
                <rect width="12" height="12" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className={s.rightPartHeader}>
          <button className={s.listBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#AAB7BF"/>
            </svg>
          </button>

          <div className={s.hideBtnWrapper}>
            <button className={s.hideBtn}
                    onClick={collapse}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 3V21M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="#AAB7BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {
              showTooltip && <div className={s.tooltip}>Свернуть</div>
            }
          </div>
        </div>

      </div>

      {
        currentRightPanelItem.name === "browser" && <BrowserPanel data={currentRightPanelItem.data}/>
      }
    </div>
  );
};

export default RightPanelContent;