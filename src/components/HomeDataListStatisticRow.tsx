import { Space, Tooltip } from "antd"
import { IStatisticData } from "../interfaces"
import dayjs from "dayjs"

const FWIDescription = ({ title, data, unit }: { title: string, data: number, unit?: string }) => {
  return <p className="text-xs"><strong>{title}:</strong> {Math.round((data + Number.EPSILON) * 100) / 100}{unit}</p>
}

export const HomeDataListStatisticRow = ({ data }: { data: IStatisticData }) => {
  return (
    <div className="flex flex-wrap items-center hover:bg-slate-200 space-y-2">
      <small className="w-full ml-4 mt-2 text-slate-500">{dayjs(data.mCreatedAt).format("DD/MM/YYYY HH:mm")}</small>
      <img
        src={data.mCondition.icon ?? "//placehold.co/64"}
        alt={data.mCondition.text ?? 'N/A'}
      />
      <div className="flex-grow pr-9">
        <div className="flex justify-between">
          <div>
            <h5 className="text-3xl md:text-4xl font-bold mb-0">{Math.round((data.mTemperature + Number.EPSILON) * 10) / 10}° C</h5>
            <small>{data.mCondition.text ?? 'N/A'}</small>
          </div>
          <Space direction="vertical">
            <Tooltip title="Forest fire probability" arrow>
              <h5 className="text-xl md:text-3xl mb-0">{data.mFireRisk ? Math.round((data.mFireRisk + Number.EPSILON) * 100) / 100 : 'N/A'}</h5>
            </Tooltip>
          </Space>
        </div>
      </div>
      <div className="w-full flex justify-between px-5 space-x-2">
        <FWIDescription title="FFMC" data={data.mFFMC} />
        <FWIDescription title="DMC" data={data.mDMC} />
        <FWIDescription title="DC" data={data.mDC} />
        <FWIDescription title="ISI" data={data.mISI} />
        <FWIDescription title="Windspeed" data={data.mWindSpeed} unit="km/h" />
        <FWIDescription title="Humidity" data={data.mHumidity} unit="%" />
        <FWIDescription title="Rainfall" data={data.mRainfall} unit="mm" />
      </div>
    </div>
  )
}
