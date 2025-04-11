import s from './ProductDescription.module.scss';
import TiptapEditor from "@/components/ui/Editor/Editor.jsx";

const ProductDescription = ({setValue, getValues, setFormWasEdited}) => {
  return (
    <div className={s.descWrapper}>
      <h3 className={s.descTitle}>Описание товара</h3>
      <TiptapEditor setValue={setValue} getValues={getValues} setFormWasEdited={setFormWasEdited} />
    </div>
  );
};

export default ProductDescription;