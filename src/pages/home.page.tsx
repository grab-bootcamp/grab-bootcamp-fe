import { Button, Space } from "antd"
import { HomeDataFilter, HomeDataList, HomeMap } from "../components"
import { UndoOutlined } from "@ant-design/icons"
import { useStateStore } from "../store"
import { useState } from "react"
import dayjs from "dayjs"

export const HomePage = () => {
  const [currentRange, setCurrentRange] = useState<[Date, Date]>([
    dayjs().subtract(7, 'days').toDate(),
    dayjs().toDate(),
  ])

  const { resetMap } = useStateStore(state => ({
    resetMap: state.resetMap
  }))

  return (
    <div className="flex flex-wrap lg:flex-nowrap space-y-3 lg:space-x-3 lg:space-y-0">
      <Space direction="vertical" className="w-full lg:w-3/5 bg-white rounded shadow p-3">
        <Button onClick={resetMap}>
          <Space>
            <UndoOutlined className="line-clamp-1" />
            Reset Map
          </Space>
        </Button>
        <HomeMap />
      </Space>
      <div className="w-full lg:w-2/5 space-y-3">
        <HomeDataFilter
          classNames="bg-white rounded shadow block p-3"
          currentRange={currentRange}
          setCurrentRange={setCurrentRange}
        />
        <Space className="bg-white rounded shadow block">
          <HomeDataList filterRange={currentRange} />
        </Space>
      </div>
    </div>
  )
}
