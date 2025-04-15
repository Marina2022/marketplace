import s from './UniteProductBlock.module.scss';
import useHasVerticalScrollbar from "@/hooks/useHasVerticalScrollbar.js";
import Button from "@/components/ui/Button/Button.jsx";

const UniteProductBlock = ({checkedProducts}) => {

  const hasScrollbar = useHasVerticalScrollbar()

  return (
    <div className={`${s.uniteProductBlock} ${hasScrollbar ? s.withOffset : ''}`}>
      <div className={s.selectedText}>
        Выбрано:
        <span className={s.number}>{checkedProducts.length}</span>
      </div>
      <Button className={s.uniteBtn} disabled={checkedProducts.length === 1}>Объединить</Button>
    </div>
  );
};

export default UniteProductBlock;