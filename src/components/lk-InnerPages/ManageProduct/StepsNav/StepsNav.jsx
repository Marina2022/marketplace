import s from './StepsNav.module.scss';

const StepsNav = ({navItems, setStep, step, trigger, productPhotos, product}) => {
  const onSelectStep = async (name) => {
    if (name === 'preview') {
      const isValid = await trigger();

      if (!isValid || (productPhotos.length === 0 && product?.mediaContent?.productImages.length === 0) ) {
        alert('Нужно заполнить все обязательные поля и добавить хотя бы одно фото товара')
        return
      } else {
        setStep('preview')
        return
      }
    }
    setStep(name)
  }

  return (
    <ul className={s.stepsNavWrapper}>
      {
        navItems.map((item, i) => {
          return (
            <li onClick={() => onSelectStep(item.name)} key={i} className={item.name === step ? s.stepActive : s.step}>
              <div className={s.number}>{i + 1}</div>
              <div className={s.itemText}>{item.label}</div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default StepsNav