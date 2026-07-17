import s from './UserBalance.module.scss';

const UserBalance = () => {
  return (
    <div className={s.balance}>
      <div className={s.textBlock}>
        <div className={s.balanceText}>Баланс</div>
        <div className={s.balanceValue}>1&nbsp;347&nbsp;489&nbsp;Р</div>
      </div>

      <div className={s.plusBlock}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 0.5V14.5M14.5 7.5H0.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  )
}

export default UserBalance;