import s from "./AboutDetails.module.scss";

const AboutDetails = ({company}) => {
  return (
    <div className={s.details}>
      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>Тип бизнеса</div>
          <span className={s.dots}></span>
        </div>
        <div className={s.value}>{company.businessFeatures.businessType}</div>
      </div>

      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>Главные товары</div>
          <span className={s.dots}></span>
        </div>
        <div className={s.value}>{company.businessFeatures.mainProducts}</div>
      </div>

      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>Количество сотрудников</div>
          <span className={s.dots}></span>
        </div>
        <div className={s.value}>{company.businessFeatures.employeeCount}</div>
      </div>

      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>Год основания</div>
          <span className={s.dots}></span>
        </div>
        <div className={s.value}>{new Date(company.businessFeatures.foundationDate).toLocaleDateString()}</div>
      </div>

      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>Сертификация системы менеджмента</div>
          <span className={s.dots}></span>
        </div>
        <div
          className={s.value}>{company.businessFeatures.managementCertification}</div>
      </div>

      <div className={s.row}>
        <div className={s.leftPart}>
          <div className={s.label}>SSG сертификация</div>
          <span className={s.dots}></span>
        </div>
        <div
          className={s.value}>{company.businessFeatures.ssgCertification}</div>
      </div>
    </div>
  );
};

export default AboutDetails;