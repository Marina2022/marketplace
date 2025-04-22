import s from './Editor.module.scss'

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {EditorContent, useEditor} from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import {useEffect} from "react";

const TiptapEditor = ({setValue, maxValue = 1000, getValues, setFormWasEdited}) => {
  const productDescription = getValues("productDescription") || ""
  const editor = useEditor({
    onBlur: () => {
      setValue('productDescription', editor.getHTML())
      setFormWasEdited(true)
    },

    onUpdate: ({editor}) => {
      let text = editor.getText().replace(/\s+/g, '')
      if (text.length > maxValue) {
        editor.commands.setContent(editor.storage.prevContent || '') // Откат к предыдущему состоянию
      } else {
        editor.storage.prevContent = editor.getHTML() // Сохраняем текущее состояние
      }
    },

    extensions: [StarterKit, Underline,
      Placeholder.configure({
        placeholder: "Опишите ваш товар максимально подробно. Укажите преимущества и особенности, которые выделяют его среди других.",
      }),
    ],
    content: productDescription,
  })

  useEffect(() => {
    if (editor && productDescription !== editor.getHTML()) {
      editor.commands.setContent(productDescription)
    }
  }, [productDescription, editor])

  if (!editor) {
    return null
  }

  return (
    <div className={s.wrapper}>
      <div className={s.buttonsWrapper}>
        <button type="button"
                className={`${s.formatBtn} ${editor?.isActive('bold') ? s.active : ''} `}
                onClick={() => editor.chain().focus().toggleBold().run()}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 22V0H9.42579C12.6937 0 15.1737 0.510657 16.8579 1.5367C18.5489 2.55759 19.3942 4.05859 19.3942 6.03367C19.3942 7.11135 19.0537 8.06555 18.3721 8.88552C17.6968 9.7055 16.7568 10.3091 15.5458 10.6902C16.9274 10.9742 18.0126 11.5416 18.8074 12.3977C19.6026 13.2534 20 14.3001 20 15.5383C20 17.6523 19.1737 19.251 17.5268 20.3394C15.8737 21.4274 13.5205 21.9793 10.4668 22H0ZM5.54579 12.4386V18.3488H10.2963C11.6026 18.3488 12.6247 18.0959 13.3563 17.5904C14.0884 17.0853 14.4542 16.3836 14.4542 15.4918C14.4542 13.4857 13.1795 12.4696 10.6311 12.4386H5.54579ZM5.54579 9.22066H9.65316C12.4479 9.17979 13.8484 8.27205 13.8484 6.48754C13.8484 5.49247 13.4953 4.77531 12.7821 4.33693C12.0758 3.89898 10.9589 3.68215 9.42579 3.68215H5.54579V9.22066Z"
              fill="black"/>
          </svg>
        </button>

        <button type="button"
                className={`${s.formatBtn} ${editor?.isActive('underline') ? s.active : ''} `}
                onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19.3714 0V9.97798C19.3714 11.8683 18.535 13.364 16.8608 14.4641C15.1891 15.5626 12.9003 16.1122 9.99939 16.1122C7.14529 16.1122 4.8766 15.5759 3.19574 14.5088C1.51854 13.4434 0.628571 11.9744 0.628571 10.1077V0H5.66626V9.9943C5.66626 11.1271 6.05106 11.9503 6.81884 12.4682C7.58541 12.9861 8.64742 13.2454 9.99939 13.2454C12.831 13.2454 14.3161 12.1929 14.3161 10.0913V0H19.3714ZM20 19.1877V22H0V19.1877H20Z"
              fill="black"/>
          </svg>
        </button>

        <button
          type="button"
          className={`${s.formatBtn} ${editor?.isActive('bulletList') ? s.active : ''} `}
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 7H29" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M11 16H22" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M11 25H29" stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path
              d="M5 9C6.10457 9 7 8.10457 7 7C7 5.89543 6.10457 5 5 5C3.89543 5 3 5.89543 3 7C3 8.10457 3.89543 9 5 9Z"
              stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M5 18C6.10457 18 7 17.1046 7 16C7 14.8954 6.10457 14 5 14C3.89543 14 3 14.8954 3 16C3 17.1046 3.89543 18 5 18Z"
              stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M5 27C6.10457 27 7 26.1046 7 25C7 23.8954 6.10457 23 5 23C3.89543 23 3 23.8954 3 25C3 26.1046 3.89543 27 5 27Z"
              stroke="black" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button
          type="button"
          className={`${s.formatBtn} ${editor?.isActive('orderedList') ? s.active : ''} `}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5.42741 10.8638C5.94976 10.8638 6.29798 10.5692 6.29798 9.96652V5.64064C6.29798 5.07812 5.89621 4.71652 5.32033 4.71652C4.83816 4.71652 4.54353 4.87721 4.20867 5.10492L3.27118 5.76115C2.98993 5.94869 2.84261 6.12275 2.84261 6.40401C2.84261 6.75224 3.12387 6.99332 3.43193 6.99332C3.59261 6.99332 3.68638 6.96652 3.91404 6.80584L4.5301 6.39064H4.54353V9.96652C4.54353 10.5692 4.90513 10.8638 5.42741 10.8638ZM10.0748 9.24332H28.4096C29.0257 9.24332 29.4944 8.77458 29.4944 8.17189C29.4944 7.55578 29.0257 7.08709 28.4096 7.08709H10.0748C9.4721 7.08709 9.00335 7.55578 9.00335 8.17189C9.00335 8.77458 9.4721 9.24332 10.0748 9.24332ZM3.27118 18.9397H6.71313C7.08816 18.9397 7.35604 18.6853 7.35604 18.3103C7.35604 17.9085 7.08816 17.654 6.71313 17.654H4.79798V17.6138L5.89621 16.7299C6.82027 15.9799 7.1685 15.5513 7.1685 14.7612C7.1685 13.6897 6.27118 12.9665 4.82473 12.9665C3.55244 12.9665 2.61496 13.6362 2.61496 14.4933C2.61496 14.9219 2.89621 15.1496 3.35153 15.1496C3.65958 15.1496 3.87387 15.0558 4.04798 14.7478C4.23547 14.4263 4.48993 14.2522 4.85153 14.2522C5.2533 14.2522 5.52118 14.5067 5.52118 14.8817C5.52118 15.2032 5.3605 15.4844 4.67741 16.0335L2.90958 17.4799C2.65513 17.6942 2.54798 17.9353 2.54798 18.2299C2.54798 18.6451 2.82924 18.9397 3.27118 18.9397ZM10.0748 17.346H28.4096C29.0257 17.346 29.4944 16.8638 29.4944 16.2612C29.4944 15.6585 29.0257 15.1897 28.4096 15.1897H10.0748C9.4721 15.1897 9.00335 15.6585 9.00335 16.2612C9.00335 16.8638 9.4721 17.346 10.0748 17.346ZM4.86495 27.2835C6.4453 27.2835 7.39615 26.5737 7.39615 25.4487C7.39615 24.7121 6.87387 24.2032 5.94975 24.1228V24.0826C6.63278 23.9621 7.15513 23.5067 7.15513 22.7299C7.15513 21.7121 6.16404 21.1495 4.85153 21.1495C3.79353 21.1495 2.65513 21.6451 2.65513 22.529C2.65513 22.904 2.92296 23.1719 3.33816 23.1719C3.63278 23.1719 3.76673 23.0513 3.95421 22.8505C4.26227 22.5157 4.51673 22.4085 4.83816 22.4085C5.2533 22.4085 5.56136 22.6094 5.56136 23.0112C5.56136 23.3862 5.2533 23.5737 4.70421 23.5737H4.54353C4.1685 23.5737 3.92747 23.7612 3.92747 24.1495C3.92747 24.5112 4.15513 24.7254 4.54353 24.7254H4.71764C5.32033 24.7254 5.64176 24.9263 5.64176 25.3415C5.64176 25.7031 5.3069 25.971 4.86495 25.971C4.38278 25.971 4.04798 25.7031 3.79353 25.4487C3.63278 25.3013 3.4989 25.1942 3.25781 25.1942C2.81581 25.1942 2.50781 25.4487 2.50781 25.8638C2.50781 26.788 3.76673 27.2835 4.86495 27.2835ZM10.0748 25.4353H28.4096C29.0257 25.4353 29.4944 24.9665 29.4944 24.3638C29.4944 23.7478 29.0257 23.279 28.4096 23.279H10.0748C9.4721 23.279 9.00335 23.7478 9.00335 24.3638C9.00335 24.9665 9.4721 25.4353 10.0748 25.4353Z"
              fill="black"/>
          </svg>
        </button>
      </div>

      <div className={s.editorWrapper}>
        <EditorContent
          editor={editor}
          className={`${s.editor} lk-scroll`}
          onClick={() => editor?.commands.focus()}
        />
      </div>

      <div className={s.counter}>
        ({
        editor.getText().replace(/\s+/g, '').length
      }/{maxValue})
      </div>
    </div>
  );
};

export default TiptapEditor;

