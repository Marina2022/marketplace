import s from './Subscriptions.module.scss';
import {getSubscriptions, setSubscriptions} from "@/store/subscriptionSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import Button from "@/components/ui/Button/Button.jsx";

const Subscriptions = () => {

  const subscriptions = useSelector(getSubscriptions)
  const profileId = useSelector(getActiveProfileId)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const getSubscription = async () => {

      try {
        setLoading(true)
        const result = await axiosInstance('subscriptions/me')
        dispatch(setSubscriptions(result.data))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getSubscription()
  }, [profileId])

  if(subscriptions && !subscriptions.currentPlan) return null

  if (loading) return <div className={s.subscriptionsWrapper}></div>

  const requestsPercent = subscriptions.usage.activeRequests.current / subscriptions.usage.activeRequests.max * 100

  return (
    <div className={s.subscriptionsWrapper}>
      <div className={s.title}>{subscriptions.currentPlan.name}</div>

      <ul className={s.metrics}>
        <li className={s.item}>
          <div className={s.row}>
            <div className={s.label}>Заявки</div>
            <div className={s.value}>
              {subscriptions.usage.activeRequests.current}/{subscriptions.usage.activeRequests.max}
            </div>
          </div>
          <div className={s.bar}>
            <div className={s.valueBar} style={{width: requestsPercent + "%"}}></div>
          </div>
        </li>

        <li className={s.item}>
          <div className={s.row}>
            <div className={s.label}>Закрепленные чаты</div>
            <div className={s.value}>
              {subscriptions.usage.pinnedChatsPerRequest.max}
            </div>
          </div>
        </li>

        <li className={s.item}>
          <div className={s.row}>
            <div className={s.label}>Тегов в заявке</div>
            <div className={s.value}>
              {subscriptions.usage.tagsPerRequest.max}
            </div>
          </div>
        </li>

        <li className={s.item}>
          <div className={s.row}>
            <div className={s.label}>Файлов в заявке</div>
            <div className={s.value}>
              {subscriptions.usage.attachmentsPerRequest.max}
            </div>
          </div>
        </li>
      </ul>

      <Button black className={s.btn}>
        <span>Сменить план</span>
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8333 6.58333L14.75 3.66667L11.8333 0.75M14.75 3.66667H0.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Button>
    </div>
  )
}

export default Subscriptions;