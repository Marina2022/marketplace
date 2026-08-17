import s from './RequestDesc.module.scss';
import {useState} from "react";
import {useMediaQuery} from "react-responsive";

const DESC_LIMIT = 300

const RequestDesc = ({request}) => {

  const isMobile = useMediaQuery({maxWidth: 960})



  let initialDescMobile = request.description.slice(0, DESC_LIMIT)
  if (request.description > initialDescMobile) initialDescMobile = initialDescMobile + '...'

  const [description, setDescription] = useState(isMobile ? initialDescMobile : request.description)

  return (
    <div className={s.requestDesc}>
      <h3 className={s.descTitle}>Описание</h3>
      <div className={s.desc} dangerouslySetInnerHTML={{__html: description}} ></div>

      {
        description.length < request.description.length && (
          <button
            onClick={() => setDescription(request.description)}
            className={s.showAllBtn}>
            Показать полностью
          </button>
        )
      }

    </div>
  );
};

export default RequestDesc;