import { Button } from "antd"


export const NotFoundPage = () => {
  return (
    <div
      className="flex flex-col flex-initial h-screen items-center justify-center"
    >
      <img src="/404.svg" className="w-60 lg:w-96" />
      <h2 className="text-3xl text-center">Sorry we couldn't find what you're looking for.</h2>
      <Button
        onClick={() => window.location.href = '/'}
      >
        Go to Home
      </Button>
    </div>
  )
}
