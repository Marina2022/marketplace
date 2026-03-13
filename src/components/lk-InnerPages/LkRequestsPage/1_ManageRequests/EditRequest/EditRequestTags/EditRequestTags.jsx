import s from './EditRequestTags.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import OneTag
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/EditRequest/EditRequestTags/OneTag/OneTag.jsx";

const EditRequestTags = ({catId, selectedTags, setSelectedTags}) => {

  const [tagsByCat, setTagsByCat] = useState([])  // все теги, возможные для выбранной категории

  console.log('selectedTags = ', selectedTags)
  console.log('tagsByCat = ', tagsByCat)

  useEffect(() => {

    const getTags = async () => {
      if (!catId) return

      try {
        const response = await axiosInstance(`/requests/category/${catId}/tags`)
        setTagsByCat(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getTags()

  }, [catId]);

  if (tagsByCat.length === 0) {
    return (
      <div>Нет ключевых слов для выбранной категории</div>
    )
  }

  return (
    <ul className={s.tagsList}>
      {
        tagsByCat.map(tag => <OneTag key={tag.tagId} tag={tag} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />)
      }
    </ul>
  );
};

export default EditRequestTags;