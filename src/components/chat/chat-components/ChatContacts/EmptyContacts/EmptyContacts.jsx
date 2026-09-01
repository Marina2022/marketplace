import s from './EmptyContacts.module.scss';
import SkeletonChatContacts
  from "@/components/chat/chat-components/ChatContacts/EmptyContacts/SceletonChatContacts/SkeletonChatContacts.jsx";

const EmptyContacts = () => {
  return (
    <div className={s.emptyContacts}>
      <ul>
        <SkeletonChatContacts />
        <SkeletonChatContacts />
        <SkeletonChatContacts />
      </ul>

      <div className={s.textBlock}>
        <div className={s.title}>Контактов нет</div>
        <div className={s.text}>Список собеседников появится после <br/>
          первого диалога.</div>
      </div>
    </div>
  );
};

export default EmptyContacts;