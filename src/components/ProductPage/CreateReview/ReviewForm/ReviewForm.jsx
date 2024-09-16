import axios from "@/api/axiosInstance.js";
import {useDropzone} from "react-dropzone";
import s from './ReviewForm.module.scss';

import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {useNavigate} from "react-router-dom";

import EditRating from "@/components/ProductPage/CreateReview/ReviewForm/EditRating/EditRating.jsx";
import TimePeriod from "@/components/ProductPage/CreateReview/ReviewForm/TimePeriod/TimePeriod.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import ChooseReviewer from "@/components/ProductPage/CreateReview/ReviewForm/ChooseReviewer/ChooseReviewer.jsx";
import Switch from "@/components/ui/Switch/Switch.jsx";
import galleryIcon from '@/assets/img/gallery.svg';

const ReviewForm = ({productId, slug}) => {

  const navigate = useNavigate()
  const activeProfileId = useSelector(getActiveProfileId)

  const [rating, setRating] = useState(0);
  const [period, setPeriod] = useState(null);
  const [ratingError, setRatingError] = useState(false);
  const [advantages, setAdvantages] = useState('');
  const [disadvantages, setDisadvantages] = useState('');
  const [comments, setComments] = useState('');
  const [anonym, setAnonym] = useState(false)
  const [chosenProfileIndex, setChosenProfileIndex] = useState(null)
  const [reviewers, setReviewers] = useState(null);
  const [images, setImages] = useState([]);
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const totalImages = images.length + newImages.length;

    // Ограничиваем общее количество изображений до 4
    if (totalImages > 4) {
      const allowedNewImages = newImages.slice(0, 4 - images.length);
      setImages([...images, ...allowedNewImages]);
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,

    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: true,
  });

  const [sending, setSending] = useState(false)

  useEffect(() => {
    if (reviewers) {
      const index = reviewers.findIndex(item => item.profileId === activeProfileId)
      setChosenProfileIndex(index)
    }
  }, [reviewers])

  useEffect(() => {
    (async () => {
      const resp = await axios.post('reviews/reviewers', {productId})
      setReviewers(resp.data)
    })()
  }, []);

  const periods = [
    'Меньше месяца',
    'Несколько месяцев',
    'Больше года'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();

    // пока идет отправка, кнопка работать не будет
    if (sending) return

    // рейтинг должен быть обязательно:
    if (rating === 0) {
      setRatingError(true);
      return;
    }

    const body = {
      profileType: reviewers[chosenProfileIndex].reviewerType,
      profileId: reviewers[chosenProfileIndex].profileId,
      productId: productId,
      ratingValue: rating,
      experience: periods[period],
      advantage: advantages,
      disadvantage: disadvantages,
      comment: comments,
      isAnonimous: anonym,
    }

    try {
      setSending(true)
      const resp = await axios.post('reviews/add', body)
      const reviewId = resp.data.reviewId
      const formData = new FormData();

      // Добавляем каждый файл в FormData
      Array.from(images).forEach((file) => {
        formData.append('request', file, file.name);
      });

      try {
        await axios.post(`reviews/${reviewId}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (error) {
        console.error('Ошибка при отправке фото:', error);
      }
      navigate(`/product/${slug}`)

    } catch (err) {
      console.log(err)
    } finally {
      setSending(false)
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <div className={s.mainPart}>
        <div className={s.starRow}>
          <h2 className={s.title}>Общая оценка</h2>
          <EditRating rating={rating} setRating={setRating} ratingError={ratingError}/>
        </div>
        <div className={s.row}>
          <h2 className={s.title}>Дополнительные сведения</h2>
          <div className={s.periodBlock}>
            <label className={s.subtitle}>Опыт использования</label>
            <TimePeriod period={period} setPeriod={setPeriod} periods={periods}/>
          </div>
        </div>
        <div className={s.row}>
          <h2 className={s.title}>Поделитесь мнением</h2>
          <div>
            <label htmlFor="advantages" className={s.subtitle}>Достоинства</label>
            <textarea
              className={s.textarea}
              placeholder="Укажите что вам понравилось"
              name="advantages"
              id="advantages"
              value={advantages}
              onChange={(e) => setAdvantages(e.target.value)}
            ></textarea>

            <label htmlFor="disadvantages" className={s.subtitle}>Недостатки</label>
            <textarea
              className={s.textarea}
              placeholder="Укажите, что не понравилось"
              name="disadvantages"
              id="disadvantages"
              value={disadvantages}
              onChange={(e) => setDisadvantages(e.target.value)}
            ></textarea>

            <label htmlFor="comments" className={s.subtitle}>Комментарии</label>
            <textarea
              className={s.textarea}
              placeholder="Расскажите больше"
              name="comments"
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={s.row}>
          <h2 className={s.title}>Добавьте фото</h2>

          <label
            className={`${s.textarea} ${s.filesInput}`}
            {...getRootProps()}
          >
            {
              images.length === 0 && (
                <div className={s.inputTextWrapper}>
                  <img src={galleryIcon} alt="icon"/>
                  <div className={s.filesInputText}>
                    Выберите фотографии или перетащите фото
                  </div>
                </div>
              )
            }

            {
              images.length > 0 && (
                <div className={s.previewList}>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.preview}
                      alt="preview"
                      className={s.previewImg}
                    />
                  ))}
                </div>
              )
            }
          </label>
          <input
            {...getInputProps()}
            className={s.fileInput}
            type="file"
          />
        </div>
      </div>
      {
        reviewers && <ChooseReviewer
          chosenProfileIndex={chosenProfileIndex}
          reviewers={reviewers}
          setChosenProfileIndex={setChosenProfileIndex}/>
      }
      <div className={s.btnWrapper}>
        <Button className={s.submitBtn} type="submit">Отправить&nbsp;отзыв</Button>
        <Switch label="Отправить отзыв анонимно" setChecked={setAnonym} checked={anonym}/>
      </div>
      <p className={s.bottomText}>Оставляя отзыв, вы соглашаетесь c <a href="#">правилами публикациии</a></p>
    </form>
  );
};

export default ReviewForm;
