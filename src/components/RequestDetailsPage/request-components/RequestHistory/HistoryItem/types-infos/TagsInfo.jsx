import s from './types-info.module.scss';

const TagsInfo = ({event}) => {
  return (
    <ul className={s.tags}>
      {event.tags.map(tag => <li key={tag.name} className={`${s.tag} ${tag.isAdded ? s.addedTag : ""}`}>
        <>
          {
            tag.isAdded ? "+ " : "- "
          }
          {tag.name}
        </>
      </li>)}
    </ul>
  )
}

export default TagsInfo;