import s from './BriefAbout.module.scss';

const BriefAbout = ({features}) => {
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Коротко о товаре</h2>

      {
        features.map((feature, i) => {
          return <div key={i} className={s.row}>
            <span className={s.left}>{feature.name}</span>
            <span className={s.dots}></span>
            <span className={s.right}>{feature.value}</span>
          </div>
        })
      }


    </div>
  );
};

export default BriefAbout;