import s from './TopTagsLineMobile.module.scss';
import TagInTopLineMobile
  from "@/components/SearchKeywordsPage/TopTagsLineMobile/TagInTopLineMobile/TagInTopLineMobile.jsx";

const TopTagsLineMobile = ({groupedTags, setMobileTagsBlockOpen}) => {

  console.log("groupedTags = ", groupedTags)

  const tags = groupedTags.flatMap(category =>
    category.catSelectedTags.map(tag => ({
      tagId: tag.id,
      tagName: tag.name,
    }))
  )

  return (
    <ul className={s.topLineMobile} onClick={()=>setMobileTagsBlockOpen(prev => !prev)}>
      {
        tags.map(tag => <TagInTopLineMobile tag={tag} key={tag.tagId} />)
      }
    </ul>
  );
};

export default TopTagsLineMobile;