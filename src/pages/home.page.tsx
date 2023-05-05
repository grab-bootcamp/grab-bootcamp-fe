import { Button, Space } from "antd"
import { HomeMap } from "../components"
import { UndoOutlined } from "@ant-design/icons"
import { useStateStore } from "../store"

export const HomePage = () => {
  const { resetMap } = useStateStore(state => ({
    resetMap: state.resetMap
  }))

  return (
    <Space direction="vertical" className="w-full md:w-3/5">
      <Button onClick={resetMap}>
        <Space>
          <UndoOutlined className="line-clamp-1" />
          Reset Map
        </Space>
      </Button>
      <HomeMap />
    </Space>
  )
}
