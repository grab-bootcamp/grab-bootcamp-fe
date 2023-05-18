import { Footer } from "antd/lib/layout/layout"

export const AppFooter = () => {
  return (
    <Footer className="text-center">
      The Forest Fire Prediction System ©{new Date().getFullYear()} Created by Group 2
    </Footer>
  )
}
