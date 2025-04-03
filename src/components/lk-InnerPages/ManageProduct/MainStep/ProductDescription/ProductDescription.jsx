import s from './ProductDescription.module.scss';
import TiptapEditor from "@/components/ui/Editor/Editor.jsx";

const ProductDescription = ({setValue, getValues, watch}) => {
  return (
    <div className={s.descWrapper}>
      <h3 className={s.descTitle}>Описание товара</h3>
      <TiptapEditor setValue={setValue} getValues={getValues} watch={watch} />
    </div>
  );
};

export default ProductDescription;