import { DatePicker, Space } from "antd"
import { classNames } from "../utils";
import dayjs from "dayjs";

interface IHomeDataFilterProps {
  classNames?: string;
  currentRange: [string, string];
  setCurrentRange: (currentRange: [string, string]) => void;
}

export const HomeDataFilter = (props: IHomeDataFilterProps) => {
  const onChange = (_: any, formatString: [string, string]) => {
    props.setCurrentRange(formatString);
  }

  return (
    <Space direction="vertical" className={classNames(props.classNames)}>
      <h2 className="text-xl font-semibold">Filter</h2>
      <DatePicker.RangePicker defaultValue={[dayjs(props.currentRange[0]), dayjs(props.currentRange[1])]} onChange={onChange} />
    </Space>
  )
}
