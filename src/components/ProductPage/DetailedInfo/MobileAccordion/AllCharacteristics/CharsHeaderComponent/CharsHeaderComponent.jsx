import charIcon from '@/assets/img/allCharacteristics.svg'
import s from './CharsHeaderComponent.module.scss';

const CharsHeaderComponent = () => {
  return (
    <div className={s.wrapper}>
      <img src={charIcon} alt="icon"/>   
      <div className={s.title}>Все характеристики</div>
    </div>
  )
}
export default CharsHeaderComponent;