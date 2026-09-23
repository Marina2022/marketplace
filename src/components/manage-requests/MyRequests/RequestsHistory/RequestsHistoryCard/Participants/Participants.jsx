import s from './Participants.module.scss';
import {getRandomColors} from "@/utils/requests.js";
import {getInitials} from "@/utils/oneRequest.js";

const Participants = ({participants}) => {

  const colors = getRandomColors()
  if (participants.length === 0) return null

  const participantToShow = participants.slice(0, 3)
  const rest = participants.length - participantToShow.length

  return (
    <ul className={s.rounds}>
      {
        participantToShow.map((participant, i) => {
          return <li key={i} className={s.round} style={{backgroundColor: colors[i]}}>
            {getInitials(participant.displayName)}
          </li>
        })
      }
      {
        rest > 0 && (
          <li className={s.round} style={{backgroundColor: "#658092", fontWeight: 500}}>
            +{rest}
          </li>
        )
      }
    </ul>
  )
}

export default Participants;