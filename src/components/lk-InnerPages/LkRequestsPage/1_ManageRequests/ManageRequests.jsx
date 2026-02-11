import s from './ManageRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";

const ManageRequests = ({handleCardClick}) => {




  return (
    <div>
      <div className={s.header}>
        <h1 className={s.title}>Управление заявками</h1>
        <Button className={s.creatRequestButton}>Создать заявку</Button>

      </div>
      <br/>
      <br/>
      <div className={s.card} onClick={handleCardClick}>Card</div>
    </div>
  );
};

export default ManageRequests;