import s from './OneTag.module.scss';

const OneTag = ({tag, selectedTags, setSelectedTags, isDirty}) => {

  const handleSelect = () => {
    isDirty.current = true;
    if (!active) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      const filteredTags = selectedTags.filter((item) => item.tagId !== tag.tagId);
      setSelectedTags(filteredTags)
    }
  }

  const active = selectedTags.find(selectedTag => selectedTag.tagId === tag.tagId);


  return (
    <li className={active ? s.tagActive : s.tag} onClick={handleSelect}>
      <span>
        {tag.tagName}
      </span>

      {
        active && (
          <button >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.04472 10C0.779175 10 0.513627 9.9022 0.303983 9.69263C-0.101328 9.28746 -0.101328 8.61684 0.303983 8.21167L8.21454 0.303877C8.61985 -0.101292 9.29071 -0.101292 9.69602 0.303877C10.1013 0.709046 10.1013 1.37967 9.69602 1.78484L1.78546 9.69263C1.5898 9.9022 1.31027 10 1.04472 10Z" fill="#3E5067"/>
              <path d="M8.95528 10C8.68973 10 8.42418 9.9022 8.21454 9.69263L0.303983 1.78484C-0.101328 1.37967 -0.101328 0.709046 0.303983 0.303877C0.709294 -0.101292 1.38015 -0.101292 1.78546 0.303877L9.69602 8.21167C10.1013 8.61684 10.1013 9.28746 9.69602 9.69263C9.48637 9.9022 9.22083 10 8.95528 10Z" fill="#3E5067"/>
            </svg>
          </button>
        )
      }

    </li>
  );
};

export default OneTag;