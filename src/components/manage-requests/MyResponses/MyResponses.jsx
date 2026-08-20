import s from "./MyResponses.module.scss";
import ManageResponses from "@/components/manage-requests/MyResponses/ManageResponses/ManageResponses.jsx";

const MyResponses = () => {
  return (
    <>
      <div className={s.requestsPage}>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <ManageResponses />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyResponses;