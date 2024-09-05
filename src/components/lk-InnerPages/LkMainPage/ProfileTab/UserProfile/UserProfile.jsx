import s from './UserProfile.module.scss';
import pencil from '@/assets/img/lk/lk-main/pencil.svg';
import {useForm} from 'react-hook-form';
import {useSelector} from "react-redux";
import {getUserData} from "@/store/userSlice.js";
import {useEffect, useRef, useState} from "react";
import InputMask from 'react-input-mask';

const UserProfile = () => {
  const userData = useSelector(getUserData);

  const [textareaFio, setTextareaFio] = useState(null);

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем новую высоту
  };

  useEffect(() => {

    setTimeout(() => {
      if (textareaFio) {
        adjustTextareaHeight({target: textareaFio}, true);
      }
    }, 100)


  }, [textareaFio]);


  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: {errors}
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
      // setValue('name', userData.fullName ? userData.fullName.trim() : null);      
      // setValue('name', 'Абдуль аглы коммио дылвоа длвлвл ');
      setValue('email', userData.email ? userData.email.trim() : null);
      setValue('phone', formattedPhone); // Устанавливаем отформатированный телефон
    }
  }, [userData, setValue]);

  const onSubmit = (data) => {
    // Преобразуем телефон в числовой формат для отправки
    const numericPhone = data.phone.replace(/\D/g, '');
    console.log("Отправляемый номер:", numericPhone);
    console.log(data);

    console.log('fio: ', textareaFio.value)
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
        <div className={s.control}>
          <label


            className={s.label} htmlFor="name">ФИО:</label>
          
          <textarea
            className={s.textarea}
            placeholder="Не заполнено"
            id="name"
            spellCheck={false}
            onChange ={(e) => adjustTextareaHeight(e)}
            defaultValue={userData?.fullName}
            ref={(el) => {
              setTextareaFio(el)
            }}
          ></textarea>
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        {/* Телефон */}
        <div className={s.control}>
          <label className={s.label} htmlFor="phone">Телефон:</label>
          <InputMask
            className={s.input}
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
        <div className={s.control}>
          <label className={s.label} htmlFor="email">Email:</label>
          <input
            className={s.input}
            placeholder="Не заполнено"
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
