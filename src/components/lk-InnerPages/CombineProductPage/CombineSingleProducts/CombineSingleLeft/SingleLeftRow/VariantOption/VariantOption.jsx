import s from './VariantOption.module.scss';
import CombineContextMenu from "@/components/lk-InnerPages/CombineProductPage/CombineContextMenu/CombineContextMenu.jsx";
import {useEffect, useRef, useState} from "react";

const VariantOption = ({ productToMerge, attribute }) => {
  const productCharacteristicsValue = productToMerge.variantCharacteristicsOptions.find(
    item => item.optionId === attribute.optionId
  );

  const buttonRef = useRef();
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState(null);

  const openMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX
      });
      setMenuOpen(true);
    }
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className={s.attribute} onClick={openMenu}>
      <div className={`${s.value} ${menuOpen ? s.valueMenuOpen : ''} `}  >
        <span>{productCharacteristicsValue.optionValue}</span>
        <svg          
          className={`${s.menuBtn} ${menuOpen ? s.menuBtnMenuOpen : ''}`}
          ref={buttonRef}
          width="14"
          height="7"
          viewBox="0 0 14 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.00063 6.59998C6.47563 6.59998 5.95062 6.39748 5.55312 5.99998L0.663125 1.10998C0.445625 0.89248 0.445625 0.53248 0.663125 0.31498C0.880625 0.0974805 1.24063 0.0974805 1.45813 0.31498L6.34813 5.20498C6.70813 5.56498 7.29313 5.56498 7.65313 5.20498L12.5431 0.31498C12.7606 0.0974805 13.1206 0.0974805 13.3381 0.31498C13.5556 0.53248 13.5556 0.89248 13.3381 1.10998L8.44813 5.99998C8.05063 6.39748 7.52563 6.59998 7.00063 6.59998Z"
            fill="#658092"
          />
        </svg>
      </div>

      {menuOpen && (
        <div ref={menuRef}>
          <CombineContextMenu position={menuPosition} />
        </div>
      )}
    </div>
  );
};

export default VariantOption;
