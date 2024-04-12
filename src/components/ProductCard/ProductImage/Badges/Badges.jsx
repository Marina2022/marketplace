import s from './Badges.module.scss';
import Badge from "@/components/ui/Badge/Badge.jsx";

const Badges = ({product}) => {
  return (
      <div className={s.badgeContainer}>
        <div className={s.badgeInnerContainer}>
          {
              product.isSecondHand && <Badge bgColor="#E32636">Б\У</Badge>
          }

          {
              product.isDiscounted && <Badge bgColor="#AAB7BF">Уцененный</Badge>
          }
        </div>
        <div>
          {
              product.discount && <Badge bgColor="#FF3104">-{product.discount}%</Badge>
          }
        </div>
      </div>
  );
};

export default Badges;