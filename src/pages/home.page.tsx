import { Button, Select, Space } from "antd"
import { HomeDataFilter, HomeDataList, HomeMap, HomeEmailSubscribeForm } from "../components"
import { SearchOutlined, UndoOutlined } from "@ant-design/icons"
import { useStateStore } from "../store"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { useSearchParams } from "react-router-dom"

export const HomePage = () => {
  const [currentRange, setCurrentRange] = useState<[Date, Date]>([
    dayjs().subtract(7, 'days').toDate(),
    dayjs().toDate(),
  ])

  const { forests, activeForestIndex, setActiveForestIndexByForestId } = useStateStore(state => ({
    setActiveForestIndexByForestId: state.setActiveForestIndexByForestId,
    forests: state.forests,
    activeForestIndex: state.activeForestIndex
  }))

  const [searchParams, setSearchParams] = useSearchParams()

  const { resetMap } = useStateStore(state => ({
    resetMap: state.resetMap
  }))

  useEffect(() => {
    const forestId = searchParams.get('forestId')
    if (forestId) {
      setActiveForestIndexByForestId(forestId)
    }
  }, [searchParams])

  useEffect(() => {
    if (activeForestIndex !== null) {
      setSearchParams({ forestId: forests[activeForestIndex].mId })
    } else {
      setSearchParams({})
    }
  }, [activeForestIndex])

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap space-y-3 lg:space-x-3 lg:space-y-0">
        <Space direction="vertical" className="w-full lg:w-3/5 bg-white rounded shadow p-3">
          <div className="flex space-x-5">
            <Button onClick={resetMap}>
              <Space>
                <UndoOutlined className="line-clamp-1" />
                Reset Map
              </Space>
            </Button>
            <Select
              showSearch
              value={activeForestIndex}
              className="block w-full"
              suffixIcon={<SearchOutlined />}
              placeholder="Search a forest"
              onChange={(value: number) => setActiveForestIndexByForestId(forests[value].mId)}
              options={forests.map((forest, index) => ({
                label: forest.mName,
                value: index
              }))}
            />
          </div>
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
      </div >
      <HomeEmailSubscribeForm className="bg-white rounded shadow p-6 max-w-lg" />
    </>
  )
}
