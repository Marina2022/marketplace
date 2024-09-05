import s from './GridCard.module.scss';

const GridCard = ({active=false}) => {
  return (
    <div className={active ? s.gridCardActive : s.gridCard}>
      GridCard
    </div>
  );
};

export default GridCard;