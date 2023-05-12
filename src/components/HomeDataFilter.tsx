import { DatePicker, Space } from "antd"
import { classNames } from "../utils";
import dayjs, { Dayjs } from "dayjs";

type DateType = (Dayjs | null)
interface IHomeDataFilterProps {
  classNames?: string;
  currentRange: [Date, Date];
  setCurrentRange: (currentRange: [Date, Date]) => void;
}

const rangePresets: {
  label: string;
  value: [Dayjs, Dayjs];
}[] = [
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
  ];

export const HomeDataFilter = (props: IHomeDataFilterProps) => {
  const onChange = (dates: null | [DateType, DateType], _: [string, string]) => {
    if (dates && dates[0] && dates[1]) {
      props.setCurrentRange([dates[0].toDate(), dates[1].toDate()])
    }
  }

  return (
    <Space direction="vertical" className={classNames(props.classNames)}>
      <h2 className="text-xl font-semibold">Filter</h2>
      <DatePicker.RangePicker
        presets={rangePresets}
        defaultValue={[dayjs(props.currentRange[0]), dayjs(props.currentRange[1])]}
        onChange={onChange} />
    </Space>
  )
}
