import s from './UserProfile.module.scss';
import pencil from '@/assets/img/lk/lk-main/pencil.svg'
const UserProfile = () => {
  return (
    <div className={s.profile}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>Профиль пользователя</h1>
        <button className={s.edit}><img src={pencil} alt="pencil"/><span className={s.editText}>Внести&nbsp;изменения</span></button>
      </div>
      
      
      
    </div>
  );
};

export default UserProfile;