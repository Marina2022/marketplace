import s from './CategoryGroup.module.scss';
import TagInCatGroup
  from "@/components/SearchKeywordsPage/CategoryNodeKeyWords/CategoryGroup/TagInCatGroup/TagInCatGroup.jsx";

const CategoryGroup = ({catGroup}) => {
  return (
    <li className={s.group}>
      <div className={s.catName}>{catGroup.catName}</div>
      <ul className={s.tagsInGroups}>
        {
          catGroup.catSelectedTags.map(tag => <TagInCatGroup tag={tag} key={tag.id}/>)
        }
      </ul>
    </li>
  )
}

export default CategoryGroup;