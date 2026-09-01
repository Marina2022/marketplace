import s from './ContactList.module.scss';
import ContactItem from "@/components/chat/chat-components/ChatContacts/ContactList/ContactItem/ContactItem.jsx";
import MiniSpinnerPagination from "@/components/ui/miniSpinner/MiniSpinnerPagination/MiniSpinnerPagination.jsx";

const ContactList = ({contacts, observerRef, containerRef, isOnScrollLoading}) => {
  return (
    <ul className={`${s.chatList} scroll`} ref={containerRef} >
      {
        contacts.items.map((contact, index) => <ContactItem key={index} contact={contact} />)
      }

      {contacts && (contacts.meta.hasNext) && (
        <li ref={observerRef} className={s.observerDiv} style={{ listStyleType: 'none', width: '100%', minHeight: '30px' }}>
          {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
            <MiniSpinnerPagination />
          </div>}
        </li>
      )}
    </ul>
  )
}

export default ContactList;