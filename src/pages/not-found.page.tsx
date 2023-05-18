import { Button } from "antd"
import { useNavigate } from "react-router-dom"


export const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col flex-initial h-screen items-center justify-center"
    >
      <img src="/404.svg" className="w-60 lg:w-96" />
      <h2 className="text-3xl text-center">Sorry we couldn't find what you're looking for.</h2>
      <Button
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </div>
  )
}
