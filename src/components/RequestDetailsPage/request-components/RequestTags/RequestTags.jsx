import s from './RequestTags.module.scss';

const RequestTags = ({request}) => {
  return (
    <div className={s.requestTags}>
      <h3 className={s.title}>Ключевые слова</h3>

      <ul className={s.tags}>
        {
          request.tags.length > 0 && request.tags.map((tag) => <li key={tag.tagId} className={s.tag}>{tag.tagName}</li> )
        }
      </ul>
    </div>
  );
};

export default RequestTags;