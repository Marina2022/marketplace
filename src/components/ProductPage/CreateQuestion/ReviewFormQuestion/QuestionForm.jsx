import axios from "@/api/axiosInstance.js";
import s from './QuestionForm.module.scss'
import {useEffect, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import ChooseReviewer from "@/components/ProductPage/CreateReview/ReviewForm/ChooseReviewer/ChooseReviewer.jsx";
import Switch from "@/components/ui/Switch/Switch.jsx";
import {useNavigate} from "react-router-dom";
const QuestionForm = ({productId, slug}) => {

  const navigate = useNavigate()
  const [question, setQuestion] = useState('');
  const [anonym, setAnonym] = useState(false)
  const activeProfileId = useSelector(getActiveProfileId)
  const [chosenProfileIndex, setChosenProfileIndex] = useState(null)
  const [reviewers, setReviewers] = useState(null);

  let senders
  if (reviewers) {
    senders = reviewers.map(reviewer => ({...reviewer, reviewerName: reviewer.name}))
  }

  const [sending, setSending] = useState(false)

  useEffect(() => {
    (async () => {
      const resp = await axios('questions/select-sender')
      setReviewers(resp.data)
    })()
  }, []);

  useEffect(() => {
    if (reviewers) {
      const index = reviewers.findIndex(item => item.profileId === activeProfileId)
      setChosenProfileIndex(index)
    }
  }, [reviewers])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // пока идет отправка, кнопка работать не будет    
    if (sending) return

    const body = {
      profileType: reviewers[chosenProfileIndex].type,
      profileId: reviewers[chosenProfileIndex].profileId,
      productId: productId,
      questionText: question,
      isAnonimous: anonym,
    }

    try {
      setSending(true)
      await axios.post('questions/add', body)
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
        <div>
          <label htmlFor="advantages" className={s.subtitle}>Задайте вопрос о товаре</label>
          <textarea
            className={s.textarea}
            placeholder="Напишите свой вопрос о товаре"
            name="question"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
      </div>
      {
        reviewers && <ChooseReviewer
          chosenProfileIndex={chosenProfileIndex}
          reviewers={senders}
          setChosenProfileIndex={setChosenProfileIndex}/>
      }
      <div className={s.btnWrapper}>
        <Button className={s.submitBtn} type="submit">Отправить&nbsp;вопрос</Button>
        <Switch label="Отправить отзыв анонимно" setChecked={setAnonym} checked={anonym}/>
      </div>
      <p className={s.bottomText}>Оставляя вопрос, вы соглашаетесь <br className={s.mobileVisible}/> c <a href="#">правилами
        публикациии</a></p>
    </form>
  );
};

export default QuestionForm;
