import s from './SkeletonChatContacts.module.scss';

const SkeletonChatContacts = () => {
  return (
    <div className={s.skeleton}>
      <div className={s.roundBlock}></div>
      <div className={s.rightPart}>
        <div className={`${s.line} ${s.firstLine}`} />
        <div className={`${s.line} ${s.secondLine}`} />
      </div>
    </div>
  )
}

export default SkeletonChatContacts;