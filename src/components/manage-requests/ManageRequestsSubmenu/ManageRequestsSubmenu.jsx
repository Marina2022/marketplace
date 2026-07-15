import s from './ManageRequestsSubmenu.module.scss';
import SubmenuItem from "@/components/layout/Submenu/SubmenuItem/SubmenuItem.jsx";

const ManageRequestsSubmenu = () => {

  const iconRequests = <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1538 0H1.84615C1.35652 0 0.886947 0.197544 0.540726 0.549175C0.194505 0.900806 0 1.37772 0 1.875V10.625C0 11.1223 0.194505 11.5992 0.540726 11.9508C0.886947 12.3025 1.35652 12.5 1.84615 12.5H14.1538C14.6435 12.5 15.1131 12.3025 15.4593 11.9508C15.8055 11.5992 16 11.1223 16 10.625V1.875C16 1.37772 15.8055 0.900806 15.4593 0.549175C15.1131 0.197544 14.6435 0 14.1538 0ZM14.7692 10.625C14.7692 10.7908 14.7044 10.9497 14.589 11.0669C14.4736 11.1842 14.3171 11.25 14.1538 11.25H1.84615C1.68294 11.25 1.52642 11.1842 1.41101 11.0669C1.2956 10.9497 1.23077 10.7908 1.23077 10.625V1.875C1.23077 1.70924 1.2956 1.55027 1.41101 1.43306C1.52642 1.31585 1.68294 1.25 1.84615 1.25H14.1538C14.3171 1.25 14.4736 1.31585 14.589 1.43306C14.7044 1.55027 14.7692 1.70924 14.7692 1.875V10.625ZM11.0769 14.375C11.0769 14.5408 11.0121 14.6997 10.8967 14.8169C10.7813 14.9342 10.6247 15 10.4615 15H5.53846C5.37525 15 5.21873 14.9342 5.10332 14.8169C4.98791 14.6997 4.92308 14.5408 4.92308 14.375C4.92308 14.2092 4.98791 14.0503 5.10332 13.9331C5.21873 13.8158 5.37525 13.75 5.53846 13.75H10.4615C10.6247 13.75 10.7813 13.8158 10.8967 13.9331C11.0121 14.0503 11.0769 14.2092 11.0769 14.375Z" fill="currentColor"/>
  </svg>

  const iconResponses = <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.65148 0.710938H7.31814L11.0959 4.48871V12.9887C11.0959 13.2392 10.9964 13.4794 10.8193 13.6565C10.6422 13.8337 10.402 13.9332 10.1515 13.9332H1.65148C1.40099 13.9332 1.16077 13.8337 0.983653 13.6565C0.806535 13.4794 0.707031 13.2392 0.707031 12.9887V1.65538C0.707031 1.4049 0.806535 1.16468 0.983653 0.987559C1.16077 0.810441 1.40099 0.710938 1.65148 0.710938Z" stroke="currentColor" strokeWidth="1.41667" strokeLinejoin="round"/>
  </svg>



  return (
    <div className={s.wrapper}>
      <div className={s.subtitle}>Как заказчик</div>
      <ul className={s.clientItems}>
        <li>
          <SubmenuItem
            label="Мои заявки"
            url="/manage-requests/my-requests"
            icon={iconRequests}
          />
        </li>
      </ul>


      <div className={s.subtitle}>Как исполнитель</div>

      <ul className={s.responseItems}>
        <li>
          <SubmenuItem
            label="Мои отклики"
            url="/manage-requests/my-responses"
            icon={iconResponses}
          />
        </li>
      </ul>

    </div>
  );
};

export default ManageRequestsSubmenu;