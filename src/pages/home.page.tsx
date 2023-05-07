import { Button, Space } from "antd"
import { HomeDataFilter, HomeDataMenu, HomeMap } from "../components"
import { UndoOutlined } from "@ant-design/icons"
import { useStateStore } from "../store"
import { useState } from "react"
import dayjs from "dayjs"

export const HomePage = () => {
  const [currentRange, setCurrentRange] = useState<[string, string]>([
    dayjs().format('YYYY-MM-DD'),
    dayjs().subtract(1, 'days').format('YYYY-MM-DD')
  ])

  const [currentMenu, setCurrentMenu] = useState('statistics')

  const { resetMap } = useStateStore(state => ({
    resetMap: state.resetMap
  }))

  return (
    <div className="flex flex-wrap md:flex-nowrap space-y-3 md:space-x-3 md:space-y-0">
      <Space direction="vertical" className="w-full md:w-3/5 bg-white rounded shadow p-3">
        <Button onClick={resetMap}>
          <Space>
            <UndoOutlined className="line-clamp-1" />
            Reset Map
          </Space>
        </Button>
        <HomeMap />
      </Space>
      <div className="w-full md:w-2/5 space-y-3">
        <HomeDataFilter
          classNames="bg-white rounded shadow block p-3"
          currentRange={currentRange}
          setCurrentRange={setCurrentRange}
        />
        <Space className="bg-white rounded shadow block">
          <HomeDataMenu
            classNames="rounded-t"
            currentMenu={currentMenu}
            setCurrentMenu={setCurrentMenu}
          />
          <div className="p-3">List</div>
        </Space>
      </div>
    </div>
  )
}
