import axios from "@/api/axiosInstance.js";
import s from './UserProfile.module.scss';
import pencil from '@/assets/img/lk/lk-main/pencil.svg';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {getUser, getUserData} from "@/store/userSlice.js";
import {useEffect, useRef, useState} from "react";
import InputMask from 'react-input-mask';
import Button from "@/components/ui/Button/Button.jsx";

const UserProfile = () => {
  const userData = useSelector(getUserData);
  const [textareaFio, setTextareaFio] = useState(null);
  const [textareaAddress, setTextareaAddress] = useState(null);

  const [editing, setEditing] = useState(false)

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем новую высоту
  };

  useEffect(() => {

    setTimeout(() => {
      if (textareaFio) {
        adjustTextareaHeight({target: textareaFio}, true);
      }

      if (textareaAddress) {
        adjustTextareaHeight({target: textareaAddress}, true);
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
      whatsAppMsg: '',
      telegramMsg: ''
    }
  });

  useEffect(() => {
    if (userData) {
      const formattedPhone = `+7 (${userData.phoneNumber.slice(0, 3)}) ${userData.phoneNumber.slice(3, 6)}-${userData.phoneNumber.slice(6, 8)}-${userData.phoneNumber.slice(8)}`;
      const formattedWatsup = `+7 (${userData.whatsAppMsg.slice(0, 3)}) ${userData.whatsAppMsg.slice(3, 6)}-${userData.whatsAppMsg.slice(6, 8)}-${userData.whatsAppMsg.slice(8)}`;
      const formattedTg = `+7 (${userData.telegramMsg.slice(0, 3)}) ${userData.telegramMsg.slice(3, 6)}-${userData.telegramMsg.slice(6, 8)}-${userData.telegramMsg.slice(8)}`;
      setValue('email', userData.email ? userData.email.trim() : null);
      setValue('phone', formattedPhone);
      setValue('whatsAppMsg', formattedWatsup);
      setValue('telegramMsg', formattedTg);
    }
  }, [userData, setValue]);

  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    // Преобразуем телефон в числовой формат для отправки
    const numericPhone = data.phone.replace(/\D/g, '').slice(1);
    // console.log("Отправляемый номер:", numericPhone);

    const numericWhatsApp = data.whatsAppMsg.replace(/\D/g, '').slice(1);
    const numericTelegram = data.telegramMsg.replace(/\D/g, '').slice(1);
    
    console.log(data);
    console.log('fio: ', textareaFio.value)
    console.log('address: ', textareaAddress.value)
    console.log({numericPhone, numericWhatsApp, numericTelegram})

    // "firstName": "string",
    //   "secondName": "string",
    //   "middleName": "string",
    // Вероника Андреевна Певченко
    
    const nameParts = textareaFio.value.split(' ')
    const firstName = nameParts[0]  // Предположительно
    const secondName = nameParts[2]
    const middleName = nameParts[1]
    
    const body = {
      userId: userData.userId,
      firstName, secondName, middleName,
      
      email: data.email,
      phoneNumber: numericPhone,
      whatsApp: numericWhatsApp,
      telegram: numericTelegram,
      address: textareaAddress.value
    }

    try {
      const resp  = await axios.post('user', body)
      console.log(resp)
      dispatch(getUser())
    } catch(err) {
      console.log(err)
    }
    
    
    
    
    

    console.log(body)
  };


  
  return (
    <div className={s.profile}>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={s.titleWrapper}>
          <h1 className={s.title}>Профиль пользователя</h1>

          {
            !editing && <button onClick={() => setEditing(true)} type="button" className={s.edit}>
              <img src={pencil} alt="pencil"/><span className={s.editText}>Внести&nbsp;изменения</span>
            </button>
          }

          {
            editing && <Button className={s.saveBtn}>Сохранить&nbsp;изменения</Button>
          }
  
        </div>

        <h2 className={s.subTitle}>Основная информация</h2>

        <div className={s.fieldset}>
          {/* ФИО */}
          <div className={s.control}>
            <label
              className={s.label} htmlFor="name">ФИО</label>
            
            <textarea
              disabled={!editing}
              className={ !editing ? s.textareaDisabled : s.textarea}
              placeholder="Не заполнено"
              id="name"
              spellCheck={false}
              onChange={(e) => adjustTextareaHeight(e)}
              defaultValue={userData?.fullName}
              ref={(el) => {
                setTextareaFio(el)
              }}
            ></textarea>
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          {/* Телефон */}
          <div className={s.control}>
            <label className={s.label} htmlFor="phone">Номер&nbsp;телефона</label>
            <InputMask
              disabled={!editing}
              className={ !editing ? s.inputDisabled : s.input}              
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
            <label className={s.label} htmlFor="email">Email</label>
            <input
              disabled={!editing}
              className={ !editing ? s.inputDisabled : s.input}              
              placeholder="Не заполнено"
              id="email"
              type="email"
              {...register('email')}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>


          {/* Адрес */}
          <div className={s.control}>
            <label
              className={s.label} htmlFor="name">Адрес</label>

            <textarea
              disabled={!editing}
              className={ !editing ? s.textareaDisabled : s.textarea}              
              placeholder="Не заполнено"
              id="name"
              spellCheck={false}
              onChange={(e) => adjustTextareaHeight(e)}
              defaultValue={userData?.address}
              ref={(el) => {
                setTextareaAddress(el)
              }}
            ></textarea>
          </div>
        </div>
        <h2 className={s.subTitle}>Мессенджеры</h2>
        <div className={s.fieldset}>
          {/* Whatsapp */}

          <div className={s.control}>
            <label className={s.label} htmlFor="phone">Whatsapp</label>
            <InputMask
              disabled={!editing}
              className={ !editing ? s.inputDisabled : s.input}              
              mask="+7 (999) 999-99-99"
              {...register('whatsAppMsg')}
              defaultValue={userData ? `+7 (${userData.whatsAppMsg.slice(0, 3)}) ${userData.whatsAppMsg.slice(3, 6)}-${userData.whatsAppMsg.slice(6, 8)}-${userData.whatsAppMsg.slice(8)}` : ''} // Начальное значение
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                />
              )}
            </InputMask>
          </div>

          {/* Telegram */}
          <div className={s.control}>
            <label className={s.label} htmlFor="phone">Telegram</label>
            <InputMask
              disabled={!editing}
              className={ !editing ? s.inputDisabled : s.input}              
              mask="+7 (999) 999-99-99"
              {...register('telegramMsg')}
              defaultValue={userData ? `+7 (${userData.telegramMsg.slice(0, 3)}) ${userData.telegramMsg.slice(3, 6)}-${userData.telegramMsg.slice(6, 8)}-${userData.telegramMsg.slice(8)}` : ''} // Начальное значение
            >
              {(inputProps) => (
                <input
                  {...inputProps}
                />
              )}
            </InputMask>
          </div>

        </div>

        <h2 className={s.subTitle}>Тарифы</h2>


        <div className={s.lastFieldset}>
          {/* tariff */}

          <div className={s.control}>
            <label className={s.label} htmlFor="phone">Текущий тариф</label>
            <input
              disabled={!editing}
              className={ !editing ? s.inputDisabled : s.input}              
              placeholder="Не выбран"
              id="tariff"
              type="text"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
