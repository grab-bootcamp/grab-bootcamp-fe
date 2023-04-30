import { Footer } from "antd/lib/layout/layout"
import { Link } from "react-router-dom"

export const AppFooter = () => {
  return (
    <Footer className="text-center">
      PreFire ©{new Date().getFullYear()} Created by <Link to='/about'>...</Link>
    </Footer>
  )
}
