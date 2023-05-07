import { Header } from "antd/lib/layout/layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AppHeaderNotification } from ".";

export const AppHeader = () => {
  return (
    <Header className="bg-white border-b shadow-md">
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="flex float-left my-4 space-x-1" >
          <img className="h-8" title="Forest Fire Prediction Logo" src="/logo.svg" />
          <h1 className="text-gray-700 font-bold leading-8 text-xl">PreFire</h1>
        </motion.div>
      </Link>
      <div className="float-right">
        <AppHeaderNotification />
      </div>
    </Header>
  )
}
