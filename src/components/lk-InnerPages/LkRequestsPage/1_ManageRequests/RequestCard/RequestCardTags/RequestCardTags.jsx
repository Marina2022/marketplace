import s from './RequestCardTags.module.scss';

const RequestCardTags = ({tags, showAll=false}) => {

  const tagsToShow = tags.slice(0, 3)
  const restTags = tags.length - tagsToShow.length
  if (restTags > 0) tagsToShow.push(`+${restTags}`)

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