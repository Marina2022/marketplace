import s from './TagInTopLineMobile.module.scss';

const TagInTopLineMobile = ({tag}) => {
  return (
    <li className={s.tag}>
      {tag.tagName}
    </li>
  );
};

export default TagInTopLineMobile;