import { useEffect } from "react"
import { LoadingPage } from "./loading.page"
import { useParams } from "react-router-dom"
import { apiInstance } from "../api"
import { message } from "antd"

export const UnsubscribePage = () => {
  const { disposeToken } = useParams()
  useEffect(() => {
    console.log('disposeToken: ', disposeToken)
    if (disposeToken) {
      apiInstance.unsubscribeEmail(disposeToken)
        .then(() => {
          message.success('You have successfully unsubscribed from our mailing list.')
        })
        .finally(() => {
          // will throw cors error on localhost
          window.location.href = '/'
        })
    }
  }, [])

  return (
    <LoadingPage />
  )
}
