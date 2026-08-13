import s from './RequestCardTags.module.scss';

const RequestCardTags = ({tags, extraTagCount, showAll=false}) => {

  const tagsToShow = tags.slice(0, 3)

  if (extraTagCount > 0) tagsToShow.push(`+${extraTagCount}`)

  if (showAll) return (
    <ul className={s.tags}>
      {
        tags.map(tag => <li className={s.tag} key={tag}>{tag}</li>)
      }
    </ul>
  )

  return (
    <ul className={s.tags}>
      {
        tagsToShow.map(tag => <li className={s.tag} key={tag}>{tag}</li>)
      }
    </ul>
  );
};

export default RequestCardTags;