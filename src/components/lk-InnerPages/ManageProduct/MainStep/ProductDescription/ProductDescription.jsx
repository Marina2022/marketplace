import s from './ProductDescription.module.scss';
import TiptapEditor from "@/components/ui/Editor/Editor.jsx";

const ProductDescription = ({setValue}) => {
  return (
    <div className={s.descWrapper}>
      <h3 className={s.descTitle}>Описание товара</h3>
      <TiptapEditor setValue={setValue }/>
    </div>
  );
};

export default ProductDescription;