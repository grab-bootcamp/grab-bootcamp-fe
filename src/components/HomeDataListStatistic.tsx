import { gql, useLazyQuery } from '@apollo/client';
import { IStatisticData } from '../interfaces';
import { HomeDataListStatisticRow } from './HomeDataListStatisticRow'
import { useStateStore } from '../store';
import { List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

interface IHomeDataListStatisticProps {
  filterRange: [Date, Date];
}

const GET_STATISTICS = gql`
  query GetStatistic($forestId: Float!, $fromDate: DateTime!, $toDate: DateTime!, $cursor: DateTime = null, $size: Float = 10) {
    statistic(
      forestId: $forestId
      fromDate: $fromDate
      toDate: $toDate,
      cursor: $cursor,
      size: $size
    ) {
      mForestId
      mFFMC
      mDC
      mDMC
      mBUI
      mFWI
      mISI
      mTemperature
      mWindSpeed
      mHumidity
      mRainfall
      mFireRisk
      mCondition
      mCreatedAt
    }
  }
`

export const HomeDataListStatistic = (props: IHomeDataListStatisticProps) => {
  const [data, setData] = useState<IStatisticData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { forests, activeForestIndex } = useStateStore(state => ({
    forests: state.forests,
    activeForestIndex: state.activeForestIndex
  }))

  const [fetchData] = useLazyQuery<{ statistic: IStatisticData[] }>(GET_STATISTICS, {
    onCompleted(data) {
      if (data.statistic.length === 0) {
        setHasMore(false);
        return;
      }
      setData(state => [...state, ...data.statistic])
    },
  })

  useEffect(() => {
    if (activeForestIndex !== null) {
      fetchData({
        variables: {
          forestId: +forests[activeForestIndex].mId,
          fromDate: props.filterRange[0],
          toDate: props.filterRange[1],
        }
      })
    }

    // Reset data when change forest
    return () => {
      setData([]);
      setHasMore(true);
    }
  }, [activeForestIndex, props.filterRange])

  if (activeForestIndex === null) return null;

  return (
    <div
      id="data-statistic-list"
      className="overflow-auto"
      style={{ height: "38rem" }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          fetchData({
            variables: {
              forestId: +forests[activeForestIndex].mId,
              fromDate: props.filterRange[0],
              toDate: props.filterRange[1],
              cursor: data[data.length - 1]?.mCreatedAt,
            }
          })
        }}
        hasMore={hasMore}
        loader={<Skeleton className='px-2' avatar paragraph={{ rows: 1 }} active />}
        scrollableTarget="data-statistic-list"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <HomeDataListStatisticRow
              key={nanoid()}
              data={item}
            />
          )}
        />
      </InfiniteScroll>
    </div >
  )
}
