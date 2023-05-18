import { useEffect } from "react"
import { LoadingPage } from "./loading.page"
import { useNavigate, useParams } from "react-router-dom"
import { apiInstance } from "../api"
import { message } from "antd"

export const UnsubscribePage = () => {
  const { disposeToken } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (disposeToken) {
      apiInstance.unsubscribeEmail(disposeToken)
        .then(() => {
          message.success('You have successfully unsubscribed from our mailing list.')
        })
        .finally(() => {
          // replace: true will replace the current entry in the history stack instead of adding a new one
          navigate('/', { replace: true });
        })
    }
  }, [])

  return (
    <LoadingPage />
  )
}
