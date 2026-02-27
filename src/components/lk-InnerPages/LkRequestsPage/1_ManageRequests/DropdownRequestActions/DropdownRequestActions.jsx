import s from './DropdownRequestActions.module.scss';
import {useEffect, useRef} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";

const DropdownRequestActions = ({request, onClose, mobileFixed = false, requestDetails = null, resetRequests, resetRequest=null}) => {

  const dropdownRef = useRef(null);
  const profileId = useSelector(getActiveProfileId)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose()
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const responseCount = requestDetails ? requestDetails.responsesCount : request.responsesCount

  const canEdit = request.status.code === "active" && responseCount === 0
    || request.status.code === "draft"
    || request.status.code === "rejected"
    || request.status.code === "paused"
    || request.status.code === "archived"

  const canArchive = request.status.code === "active" && responseCount === 0
    || request.status.code === "draft"
    || request.status.code === "rejected"
    || request.status.code === "paused"

  const canRestore = request.status.code === "archived"
  const canPause = request.status.code === "active"
  const canResume = request.status.code === "expired" || request.status.code === "paused"
  const canCancel = request.status.code !== "expired"

  const handlePause = async () => {
    try {
      const result = await axiosInstance.post(`/requests/${request.requestId}/pause?profileId=${profileId}`)
      console.log(result)
      onClose()
      resetRequests()

      if (resetRequest) resetRequest()

    } catch (err) {
      console.log(err)
    }
  }

  const handleResume = async () => {
    try {
      const result = await axiosInstance.post(`/requests/${request.requestId}/resume?profileId=${profileId}`)
      console.log(result)
      onClose()
      resetRequests()
      if (resetRequest) resetRequest()

    } catch (err) {
      console.log(err)
    }
  }

  // todo - потестить, пока не работает - ошибка 500
  const handleArchive = async () => {
    try {
      const result = await axiosInstance.post(`/requests/${request.requestId}/archive?profileId=${profileId}`)
      console.log(result)
      onClose()
      resetRequests()
      if (resetRequest) resetRequest()

    } catch (err) {
      console.log(err)
    }
  }


  const handleRestore = async () => {
    try {
      const result = await axiosInstance.post(`/requests/${request.requestId}/restore?profileId=${profileId}`)
      console.log(result)
      onClose()
      resetRequests()
      if (resetRequest) resetRequest()

    } catch (err) {
      console.log(err)
    }
  }

  // todo - потестить (если ничего важного не сотру)
  const handleCancel = async () => {
    try {
      const result = await axiosInstance.post(`/requests/${request.requestId}/cancel?profileId=${profileId}`)
      console.log(result)
      onClose()
      resetRequests()
      if (resetRequest) resetRequest()

    } catch (err) {
      console.log(err)
    }
  }

  // status.code = "unknown" - для тестов можно оставить
  return (
    <ul className={`${s.dropdownRequestActions} ${mobileFixed ? s.fixed : ''}`} ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}>

      {
        canEdit && <li className={s.menuItem}>Редактировать</li>
      }

      {
        canArchive && <li className={s.menuItem} onClick={handleArchive} >Архивировать</li>
      }

      {
        canRestore && <li className={s.menuItem} onClick={handleRestore} >Восстановить</li>
      }

      {
        canPause && <li className={s.menuItem} onClick={handlePause}>Приостановить показ</li>
      }

      {
        canResume && <li className={s.menuItem} onClick={handleResume}>Возобновить показ</li>
      }

      {
        canCancel && <li className={s.menuItem} onClick={handleCancel}>Отменить заявку</li>
      }

    </ul>
  );
};

export default DropdownRequestActions;