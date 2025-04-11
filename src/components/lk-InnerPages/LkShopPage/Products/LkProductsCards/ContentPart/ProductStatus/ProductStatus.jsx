import s from './ProductStatus.module.scss';
import Annotation from "@/components/ui/Annotation/Annotation.jsx";
import {useState} from "react";

const ProductStatus = ({product}) => {

  const [showAnnotation, setShowAnnotation] = useState(false)


  let annotationText = ''

  if (product.productStatus === 'Продается') annotationText = 'Товар успешно размещен в продаже и доступен для покупателей. Он отображается в каталоге и может быть куплен.'
  if (product.productStatus === 'Снят с продажи') annotationText = 'Товар больше не продается, и его нет в активных предложениях. Это может быть связано с окончанием продаж, деактивацией продавцом или нарушением правил площадки.'
  if (product.productStatus === 'На модерации') annotationText = 'Товар проходит проверку перед публикацией. Это может занять некоторое время.'
  if (product.productStatus === 'Ожидает действия') annotationText = 'Товар готов к дальнейшей обработке, но требует дополнительных действий с вашей стороны. Например, необходимо разместить товар на складе, добавить недостающие данные или подтвердить наличие.'
  if (product.productStatus === 'В архиве') annotationText = 'Товар перенесен в архив и больше не отображается в активных списках. Он недоступен для покупки, но его данные сохранены. Если нужно вернуть товар в работу, его можно восстановить.'


  return (
    <div
      onMouseEnter={() => setShowAnnotation(true)}
      onMouseLeave={() => setShowAnnotation(false)}

      className={s.annotationWrapper}>
      <div className={
        `${s.statusWrapper}
      ${product.productStatus === 'Снят с продажи' ? s.reddish : ''}
      ${product.productStatus === 'Продается' ? s.greenish : ''}`

      }>
        {product.productStatus}
      </div>

      {
        showAnnotation && <Annotation position='fromLeft'>
          <p className={s.annotationText}>
            {annotationText}
          </p>
        </Annotation>
      }


    </div>
  )
}

export default ProductStatus;