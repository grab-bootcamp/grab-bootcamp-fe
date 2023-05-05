import { Divider, List, Skeleton } from "antd"
import { INotification } from "../interfaces";
import InfiniteScroll from "react-infinite-scroll-component";
import { nanoid } from "nanoid";
import { classNames, mapNotificationSeverityToBgColor, mapNotificationTypeToIcon } from "../utils";
import { useEffect, useRef } from "react";
import { useClickedOutsideComponent } from "../hooks";
import { useStateStore } from "../store";

interface IAppHeaderNotificationMenuProps {
  className?: string;
  style: React.CSSProperties;
  loading: boolean;
  hasMore: boolean;
  notifications: INotification[];
  setVisibility: (visibility: boolean) => void;
  fetchMore: () => void;
}

export const AppHeaderNotificationMenu = (props: IAppHeaderNotificationMenuProps) => {
  const { setActiveForestIndexByForestId } = useStateStore(state => ({
    setActiveForestIndexByForestId: state.setActiveForestIndexByForestId
  }))
  const wrapperRef = useRef(null)

  const clickedOutside = useClickedOutsideComponent(wrapperRef);

  useEffect(() => {
    if (clickedOutside) {
      props.setVisibility(false);
    }
  }, [clickedOutside])

  return (
    <div ref={wrapperRef} id="infinite-scrollable-div" className={
      classNames(props.className, "z-10 w-screen md:w-96 fixed left-0 md:absolute md:-left-21.25rem overflow-auto")
    }
      style={props.style}
    >
      <InfiniteScroll
        dataLength={props.notifications.length}
        hasMore={props.hasMore}
        next={props.fetchMore}
        loader={<Skeleton className="p-2" avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="infinite-scrollable-div"
      >
        <List
          dataSource={props.notifications}
          renderItem={(item) => (
            <List.Item
              key={nanoid()}
              className={classNames(mapNotificationSeverityToBgColor[item.mSeverity], "p-2 cursor-pointer")}
              onClick={() => {
                if (item.mForestId) {
                  setActiveForestIndexByForestId(item.mForestId);
                }
              }}
            >
              <List.Item.Meta
                avatar={mapNotificationTypeToIcon[item.mType]}
                title={item.mTitle}
                description={item.mBody}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}
