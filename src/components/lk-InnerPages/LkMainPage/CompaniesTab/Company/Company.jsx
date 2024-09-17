import s from './Company.module.scss';
import axios from "@/api/axiosInstance.js";
import {useForm} from 'react-hook-form';
import InputMask from 'react-input-mask';

import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserCompanies, getUserData} from "@/store/userSlice.js";

import Button from "@/components/ui/Button/Button.jsx";
import docIcon from '@/assets/img/lk/lk-main/docIcon.svg'
import pencil from '@/assets/img/lk/lk-main/pencil.svg';
import {BASE_URL} from "@/consts/baseURL.js";

const Company = ({isCompanyDataLoading, company}) => {

    const userData = useSelector(getUserData);
    const [legalAddressEl, setLegalAddressEl] = useState(null);
    const [realAddressEl, setRealAddressEl] = useState(null);
    const [editing, setEditing] = useState(false)
    const [documents, setDocuments] = useState(null)

    useEffect(() => {
      if (company) {
        setDocuments(company.documents)
      }
    }, [company])

    const adjustTextareaHeight = (event) => {
      const textarea = event.target;
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const [legalAddress, setLegalAddress] = useState('')
    const [realAddress, setRealAddress] = useState('')


    useEffect(() => {
      setTimeout(() => {
        if (legalAddressEl) {
          adjustTextareaHeight({target: legalAddressEl}, true);
        }
      }, 0)

    }, [legalAddressEl, editing]);

    useEffect(() => {
      setTimeout(() => {
        if (realAddressEl) {
          adjustTextareaHeight({target: realAddressEl}, true);
        }
      }, 0)
    }, [realAddressEl, editing]);

    const {
      register,
      handleSubmit,
      setValue,
      formState: {errors}
    } = useForm({
      defaultValues: {
        phone: '',
        email: '',
        inn: '',
        kpp: '',
        ogrn: '',
        bic: '',
        cleaningAccount: '',
        correspondentAccount: '',
        bank: '',
        accountType: '',
        title: '',
        companyName: ''
      }
    });

    useEffect(() => {
      if (userData) {

        let formattedPhone = ''
        if (company?.phoneNumber) {
          formattedPhone = `+7 (${company?.phoneNumber.slice(0, 3)}) ${company?.phoneNumber.slice(3, 6)}-${company?.phoneNumber.slice(6, 8)}-${company?.phoneNumber.slice(8)}`;
        }

        setValue('email', company?.email ? company.email.trim() : null);
        setValue('inn', company?.inn ? company.inn.trim() : null);
        setValue('kpp', company?.kpp ? company.kpp.trim() : null);
        setValue('ogrn', company?.ogrn ? company.ogrn.trim() : null);
        setValue('bic', company?.bic ? company.bic.trim() : null);
        setValue('cleaningAccount', company?.cleaningAccount ? company.cleaningAccount.trim() : null);
        setValue('correspondentAccount', company?.correspondentAccount ? company.correspondentAccount.trim() : null);
        setValue('companyName', company?.companyName ? company.companyName.trim() : null);
        setValue('bank', company?.bank ? company.bank.trim() : null);
        setValue('accountType', company?.accountType ? company.accountType.trim() : null);
        setValue('title', company?.title ? company.title.trim() : null);
        setValue('phone', formattedPhone);

        setLegalAddress(company?.legalAdress)
        setRealAddress(company?.postalAddress)

      }
    }, [company, setValue]);

    const dispatch = useDispatch()
    const onSubmit = async (data) => {
      if (legalAddress === '' || realAddress === '') {
        return
      }

      const numericPhone = data.phone.replace(/\D/g, '').slice(1);

      const body = {
        companyId: company.companyId,
        companyName: data.companyName,
        email: data.email,
        phoneNumber: numericPhone,
        kpp: data.kpp,
        bic: data.bic,
        cleaningAccount: data.cleaningAccount,
        correspondentAccount: data.correspondentAccount,
        bank: data.bank,
        legalAdress: legalAddressEl.value,
        postalAdress: realAddressEl.value,
        position: data.title
      }

      try {
        await axios.post('companies/updateProfile', body)
        dispatch(getUserCompanies())
        setEditing(false)
      } catch (err) {
        console.log(err)
      }
    };

    const fileInputHandler = async (e) => {
      const files = e.target.files;
      if (files.length === 0) return;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('file', files[i]);
      }

      try {
        const response = await axios.post(`companies/${company.companyId}/uploadFile`, formData)

        if (response.status === 200) {

          const newDocs = [...documents, {docPath: response.data.documentPath, docName: response.data.documentName}]
          setDocuments(newDocs)

        } else {
          console.error('Ошибка загрузки файлов:', response.status);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    }
    if (isCompanyDataLoading && !company) return <div className={s.company}></div>

    return (
      <div className={s.company}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={s.titleWrapper}>
            <h1 className={s.title}>{company.companyName}</h1>

            {
              !editing && <div className={s.topPartWrapper}>
                <button onClick={() => setEditing(true)} type="button" className={s.edit}>
                  <img src={pencil} alt="pencil"/><span className={s.editText}>Внести&nbsp;изменения</span>
                </button>

                <Button className={s.downloadCartBtn}>Скачать&nbsp;карточку<span
                  className={s.mobileHidden}>&nbsp;компании</span></Button>

              </div>
            }

            {
              editing && <Button className={s.saveBtn}>Сохранить&nbsp;изменения</Button>
            }

          </div>

          <h2 className={s.subTitle}>Реквизиты компании</h2>
          <div className={s.fieldset}>

            {/* ИНН */}
            <div className={s.control}>
              <label className={`${s.label} ${editing ? s.disabledLabel : ''}`} htmlFor="inn">ИНН</label>
              <input
                disabled={true}
                className={!editing ? s.inputDisabled : s.input}
                placeholder="Не указано"
                id="inn"
                type="text"
                {...register('inn')}
              />
            </div>

            {/* ОГРН */}
            <div className={s.control}>
              <label className={`${s.label} ${editing ? s.disabledLabel : ''}`} htmlFor="ogrn">ОГРН</label>
              <input
                disabled={true}
                className={!editing ? s.inputDisabled : s.input}
                placeholder="Не указано"
                id="ogrn"
                type="text"
                {...register('ogrn')}
              />
            </div>

            {/* Наименование компании */}

            {
              
              editing && <div className={s.control}>
                <label className={s.label} htmlFor="companyName">Наименование компании</label>

                <div
                  className={` ${!editing ? s.inputDisabled : s.input} ${errors.companyName ? s.invalid : ''} `}

                >
                  <input
                    disabled={!editing}
                    className={`${s.correspondingAccInput} `}
                    placeholder="Не указано"
                    id="companyName"
                    type="text"
                    {...register('companyName', {required: true})}
                  />
                </div>
              </div>
            }

            {/* КПП */}
            <div className={s.control}>
              <label className={`${s.label}`} htmlFor="kpp">КПП</label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.kpp ? s.invalid : ''} `}
                placeholder="Не указано"
                id="kpp"
                type="text"
                {...register('kpp', {required: true})}
              />
              {errors.kpp && <p>{errors.kpp.message}</p>}
            </div>


            {/* БИК */}
            <div className={s.control}>
              <label className={s.label} htmlFor="bic">БИК</label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.bic ? s.invalid : ''} `}
                placeholder="Не указано"
                id="bic"
                type="text"
                {...register('bic', {required: true})}
              />

            </div>

            {/* Р/с */}
            <div className={s.control}>
              <label className={s.label} htmlFor="cleaningAccount">Рассчетный счет </label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.cleaningAccount ? s.invalid : ''} `}
                placeholder="Не указано"
                id="cleaningAccount"
                type="text"
                {...register('cleaningAccount', {required: true})}
              />

            </div>

            {/* Корр/сч */}
            <div className={s.control}>
              <label className={s.label} htmlFor="correspondentAccount">Корреспондентский счет</label>

              <div
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.correspondentAccount ? s.invalid : ''} `}
              >
                <input
                  disabled={!editing}
                  className={s.correspondingAccInput}
                  placeholder="Не указано"
                  id="correspondentAccount"
                  type="text"
                  {...register('correspondentAccount', {required: true})}
                />
              </div>
            </div>

            {/* Банк */}
            <div className={s.control}>
              <label className={s.label} htmlFor="bank">Банк </label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.bank ? s.invalid : ''} `}
                placeholder="Не указано"
                id="bank"
                type="text"
                {...register('bank', {required: true})}
              />
            </div>
          </div>

          <h2 className={s.subTitle}>Контактные данные</h2>
          <div className={s.fieldset}>

            {/* Юридический адрес */}
            <div className={s.control}>
              <label
                className={s.label} htmlFor="legalAddress">Юридический адрес</label>

              {
                !editing && <div className={s.textareaDisabledDiv}>{legalAddress}</div>
              }

              {
                editing && <textarea
                  className={` ${s.textarea} ${legalAddress === '' ? s.invalid : ''} `}
                  placeholder="Не указано"
                  id="legalAddress"
                  spellCheck={false}
                  onChange={
                    (e) => {
                      adjustTextareaHeight(e)
                      setLegalAddress(e.target.value)
                    }
                  }
                  value={legalAddress}
                  ref={(el) => {
                    setLegalAddressEl(el)
                  }}
                ></textarea>
              }
            </div>

            {/* Фактический адрес */}
            <div className={s.control}>
              <label
                className={s.label} htmlFor="postalAddress">Фактический адрес</label>

              {
                !editing && <div className={s.textareaDisabledDiv}>{realAddress}</div>
              }

              {
                editing && <textarea
                  className={` ${s.textarea} ${realAddress === '' ? s.invalid : ''} `}
                  placeholder="Не указано"
                  id="postalAddress"
                  spellCheck={false}
                  onChange={(e) => {
                    adjustTextareaHeight(e)
                    setRealAddress(e.target.value)
                  }}
                  value={realAddress}
                  ref={(el) => {
                    setRealAddressEl(el)
                  }}
                ></textarea>
              }
            </div>

            {/* Телефон */}
            <div className={s.control}>
              <label className={s.label} htmlFor="phone">Телефон</label>
              <InputMask
                placeholder="Не указано"
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.phone ? s.invalid : ''} `}
                mask="+7 (999) 999-99-99"
                {...register('phone', {
                  required: 'Поле телефон обязательно',
                })}
                defaultValue={company && company.phoneNumber ? `+7 (${company.phoneNumber.slice(0, 3)}) ${company.phoneNumber.slice(3, 6)}-${company.phoneNumber.slice(6, 8)}-${company.phoneNumber.slice(8)}` : ''}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    id={editing ? "phone" : ''}
                    disabled={!editing}
                  />
                )}
              </InputMask>
            </div>

            {/* Email */}
            <div className={s.control}>
              <label className={s.label} htmlFor="email">Email</label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.email ? s.invalid : ''} `}
                placeholder="Не указано"
                id="email"
                type="email"
                {...register('email', {required: true})}
              />
            </div>
          </div>

          <h2 className={s.subTitle}>Управление компанией</h2>
          <div className={s.fieldset}>

            {/* Должность */}
            <div className={s.control}>
              <label className={s.label} htmlFor="title">Должность</label>
              <input
                disabled={!editing}
                className={` ${!editing ? s.inputDisabled : s.input} ${errors.title ? s.invalid : ''} `}
                placeholder="Не указано"
                id="title"
                type="text"
                {...register('title', {required: true})}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </div>

            {/* Вы являетесь */}
            <div className={s.control}>
              <label className={`${s.label} ${editing ? s.disabledLabel : ''}`} htmlFor="accountType">Вы являетесь</label>
              <input
                disabled={true}
                className={!editing ? s.inputDisabled : s.input}
                placeholder="Не указано"
                id="accountType"
                type="text"
                {...register('accountType')}
              />
              {errors.accountType && <p>{errors.accountType.message}</p>}
            </div>
          </div>

          <h2 className={s.subTitle}>Прикрепленные файлы</h2>
          <div className={s.filesBlock}>
            <ul className={s.fileList}>
              {
                //company.documents.map((doc, i) => {
                documents && documents.map((doc, i) => {
                  return <li key={i} className={s.docItem}>
                    <a target="_blank" className={s.docItemLink} href={`${BASE_URL}${doc.docPath}`}>
                      <img src={docIcon} alt="doc icon"/>
                      <span className={s.docName}>{doc.docName}</span>
                    </a>
                  </li>
                })
              }
            </ul>
            <label className={s.fileLabelShown} htmlFor="fileIntput">Добавить файл</label>
            <input onChange={fileInputHandler} className={s.fileInputHidden} type="file" id="fileIntput"/>
          </div>
        </form>
      </div>
    );
  }
;

export default Company;