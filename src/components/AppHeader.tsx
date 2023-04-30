import { Header } from 'antd/lib/layout/layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <Header className='bg-white border-b-2 shadow-md'>
      <Link to='/'>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ ease: "easeOut", duration: 0.2 }}
          className="flex float-left my-4 space-x-1" >
          <img className="h-8" title="Forest Fire Prediction Logo" src="/logo.svg" />
          <h3 className="text-gray-700 font-bold leading-8 text-xl">PreFire</h3>
        </motion.div>
      </Link>
      <h3 className="text-gray-700 float-right">Menu here</h3>
    </Header>
  )
}
