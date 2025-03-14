import s from './Editor.module.scss'

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {EditorContent, useEditor} from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit, Underline,
      Placeholder.configure({
        placeholder: "Опишите ваш товар максимально подробно. Укажите преимущества и особенности, которые выделяют его среди других.",  
      }),
    
    ],
    // content: "",
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      {/* Панель кнопок */}
      <div className={s.buttonsWrapper}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn">
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn">
          U
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">
          1.
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">
          •
        </button>
      </div>

      {/* Сам редактор */}
      <EditorContent editor={editor} className={s.editor}
                     onClick={() => editor?.commands.focus()}
      />


      <button
        onClick={() => console.log(editor.getHTML())} // Получаем HTML-код
        className="btn mt-2"
      >
        Получить значение
      </button>
    </div>
  );
};

export default TiptapEditor;

