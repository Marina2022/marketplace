import s from './ChooseReviewer.module.scss';
import {useState, useEffect, useRef} from "react";
import pencil from '@/assets/img/lk/lk-main/pencil.svg';
import selectBtn from '@/assets/img/selectBtn.svg';

const ChooseReviewer = ({chosenProfileIndex, reviewers, setChosenProfileIndex}) => {

  console.log({chosenProfileIndex})
  console.log(reviewers[chosenProfileIndex])

  const [editing, setEditing] = useState(false);
  const nameBlockRef = useRef(null); // Реф для отслеживания элемента

  const handleClickOutside = (event) => {
    if (nameBlockRef.current && !nameBlockRef.current.contains(event.target)) {
      setEditing(false); // Сбрасываем состояние, если клик был вне блока
      setDropdownOpen(true)
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(true)

  const reviewerClickHandler = (i) => {
    setChosenProfileIndex(i)
    setDropdownOpen(false)
  }


  if (!reviewers || chosenProfileIndex === null) return <></>

  if (!editing) {
    return (
      <div>
        <p className={s.firstText}>Вы оставляете отзыв как:</p>
        <div onClick={() => setEditing(true)} className={s.nameBlock} ref={nameBlockRef}>
          <span>{reviewers[chosenProfileIndex]?.reviewerName}</span>
          <img src={pencil} alt="edit"/>
        </div>
      </div>
    );
  }

  if (editing) {
    return (
      <div
        className={s.selectBlock}
        ref={nameBlockRef}
      >
        <p className={s.firstText}>Вы оставляете отзыв как:</p>

        <div
          className={s.wrapper}
        >
          <div onClick={() => setEditing(true)} className={s.nameBlock} ref={nameBlockRef}>
            <div className={s.selectField} onClick={() => setDropdownOpen(prev => !prev)}>
              < span> {reviewers[chosenProfileIndex]?.reviewerName}</span>
              <img className={dropdownOpen ? s.selectBtn : s.selectBtnClosed} src={selectBtn} alt="arrow"/>
            </div>
          </div>

          {
            dropdownOpen && <ul className={s.options}>
              {
                reviewers.map((reviewer, i) => (
                  <li key={i}
                      onClick={() => reviewerClickHandler(i)}
                      className={i === chosenProfileIndex ? s.reviewerItemActive : s.reviewerItem}
                  >
                    {reviewer?.reviewerName}
                  </li>)
                )
              }
            </ul>
          }
        </div>

      </div>
    )
  }

};

export default ChooseReviewer;
