import s from './RequestButtons.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {requestCardMenuButton} from "@/consts/requests.jsx";
import {useEffect, useState} from "react";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import {useMediaQuery} from "react-responsive";

const RequestButtons = ({request, setRequestToEdit, resetRequest}) => {


  const isMobile = useMediaQuery({maxWidth: 960})
  const performAction = async (action, resetRequest = null) => {

    const handlePause = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/pause`)
      resetRequest()
    }

    const handleResume = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/resume`)
      resetRequest()
    }

    const handleRenew = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/renew`)
      resetRequest()
    }

    const handleComplete = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/complete`)
      resetRequest()
    }

    const handleCancel = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/cancel`)
      resetRequest()
    }

    const handleDelete = async () => {
      await axiosInstance.delete(`/requests/${request.requestId}`)
      resetRequest()
    }

    const handleSubmit = async () => {
      await axiosInstance.post(`/requests/${request.requestId}/submit`)
      resetRequest()
    }

    const handleEdit = () => {
      setRequestToEdit(request)
    }

    if (action === "pause") {
      return await handlePause()
    }

    if (action === "resume") {
      return await handleResume()
    }

    if (action === "cancel") {
      return await handleCancel()
    }

    if (action === "renew") {
      return await handleRenew()
    }

    if (action === "complete") {
      return await handleComplete()
    }

    if (action === "delete") {
      return await handleDelete()
    }

    if (action === "submit") {
      return await handleSubmit()
    }

    if (action === "edit" || action === "edit_draft") {
      handleEdit()
    }
  }
  const [primaryAction, setPrimaryAction] = useState()

  useEffect(() => {
    if (request.actions) {
      setPrimaryAction(requestCardMenuButton.find(act => act.action === request.actions.primaryAction))
    }
  }, [request])


  const handleClick = async (action) => {

    try {
      await performAction(action, resetRequest)
    } catch (err) {
      console.log(err)

      // 	message + подсказка «открепите исполнителей» на InProgress-заявке - потестить бы на реальной ошибке
      if (
        (err.response?.data?.errors?.[0]?.code === "Request.CannotCancel"
          || err.response?.data?.errors?.[0]?.code === "Request.CannotComplete")
        && request.status.code === "inprogress"
      )  {
        showErrorToast(err.response?.data?.errors?.[0].message + "\n" + "Открепите исполнителей")
        return
      }

      if (err.response && err.response.status === 400) {
        err.response.data.errors.forEach((dataItem) => {
          showErrorToast(dataItem.message)
        })
        return
      }
      showErrorToast("Что-то пошло не так :(")
    }
  }

  if (request.actions.secondaryActions.length === 0 && !request.actions.primaryAction) return null

  if (!request.actions.primaryAction && isMobile) return null

  return (
    <div className={s.requestButtons}>
      {
        request.actions && primaryAction && (
          <Button className={s.blackBtn} black onClick={()=>handleClick(primaryAction.action)} >
            {primaryAction.svg}
            {primaryAction.label}
          </Button>
        )
      }

      <div className={s.secondaryActions}>
      {
        request.actions?.secondaryActions && (
          request.actions.secondaryActions.map((action, index) => {
            const currentAction = requestCardMenuButton.find(act => act.action === action)
            if (!currentAction) return null
            return <Button
              white
              key={index}
              className={s.whiteBtn}
              onClick={()=>handleClick(action)}
            >
              {currentAction.svg}
              {currentAction.label}
            </Button>
          })
        )
      }
      </div>
    </div>
  )
}

export default RequestButtons;