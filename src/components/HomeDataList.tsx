import { HomeDataListStatistic } from "./HomeDataListStatistic";
import { useStateStore } from "../store";
import { Empty } from "antd";

interface IHomeDataListProps {
  className?: string;
  style?: React.CSSProperties;
  filterRange: [Date, Date];
}

export const HomeDataList = (props: IHomeDataListProps) => {
  const { activeForestIndex } = useStateStore(state => ({
    activeForestIndex: state.activeForestIndex
  }))

  if (activeForestIndex === null)
    return <Empty />


  return <HomeDataListStatistic filterRange={props.filterRange} />
}
