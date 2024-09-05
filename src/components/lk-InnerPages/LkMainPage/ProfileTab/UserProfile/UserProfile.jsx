import s from './UserProfile.module.scss';
import pencil from '@/assets/img/lk/lk-main/pencil.svg';
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { getUserData } from "@/store/userSlice.js";
import { useEffect } from "react";
import InputMask from 'react-input-mask';

const UserProfile = () => {
  const userData = useSelector(getUserData);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    }
  });

  useEffect(() => {
    if (userData) {
      // Преобразуем телефонный номер в формат с маской
      const formattedPhone = `+7 (${userData.phoneNumber.slice(0, 3)}) ${userData.phoneNumber.slice(3, 6)}-${userData.phoneNumber.slice(6, 8)}-${userData.phoneNumber.slice(8)}`;
      setValue('name', userData.fullName);
      setValue('email', userData.email);
      setValue('phone', formattedPhone); // Устанавливаем отформатированный телефон
    }
  }, [userData, setValue]);

  const onSubmit = (data) => {
    // Преобразуем телефон в числовой формат для отправки
    const numericPhone = data.phone.replace(/\D/g, '');
    console.log("Отправляемый номер:", numericPhone);
    console.log(data);
  };

  return (
    <div className={s.profile}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>Профиль пользователя</h1>
        <button className={s.edit}><img src={pencil} alt="pencil"/><span
          className={s.editText}>Внести&nbsp;изменения</span></button>
      </div>

      <h2 className={s.subTitle}>Основная информация</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* ФИО */}
        <div>
          <label htmlFor="name">ФИО:</label>
          <input
            id="name"
            {...register('name', )}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Телефон */}
        <div>
          <label htmlFor="phone">Телефон:</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            {...register('phone', {
              required: 'Поле телефон обязательно',              
            })}
            defaultValue={userData ? `+7 (${userData.phoneNumber.slice(0, 3)}) ${userData.phoneNumber.slice(3, 6)}-${userData.phoneNumber.slice(6, 8)}-${userData.phoneNumber.slice(8)}` : ''} // Начальное значение
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type="tel"
              />
            )}
          </InputMask>
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email')}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};

export default UserProfile;
