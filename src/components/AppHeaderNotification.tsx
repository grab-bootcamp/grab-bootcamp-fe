import { BellTwoTone } from "@ant-design/icons"
import { Badge, Button } from "antd"
import { useStateStore } from "../store";
import { useEffect, useState } from "react";
import { AppHeaderNotificationMenu } from ".";
import { gql, useLazyQuery } from "@apollo/client";

const GET_NOTIFICATION = gql`
  query GetNotification($cursor: Float = null, $size: Float = 6) {
    notification(cursor: $cursor, size: $size){
      mId
      mTitle
      mBody
      mType
      mImage
      mSeverity
      mForestId
      mCreatedAt
    }
}
`

export const AppHeaderNotification = () => {
  const [listNotificationVisible, setListNotificationVisible] = useState(false);
  const [hasMoreNotification, setHasMoreNotification] = useState(true);

  const {
    notifications,
    appendNotifications,
    unSeenNotificationCount,
    clearUnSeenNotificationCount
  } = useStateStore(state => ({
    notifications: state.notifications,
    unSeenNotificationCount: state.unSeenNotificationCount,
    appendNotifications: state.appendNotifications,
    clearUnSeenNotificationCount: state.clearUnSeenNotificationCount
  }));

  const [fetchData, { loading }] = useLazyQuery(GET_NOTIFICATION, {
    onCompleted(data) {
      if (data.notification.length === 0) {
        setHasMoreNotification(false);
        return;
      }
      appendNotifications(data.notification)
    },
  })

  useEffect(() => {
    fetchData({
      variables: {
        cursor: +notifications[notifications.length - 1]?.mId,
      }
    });
  }, [])

  const handleNotificationBtnOnClick = () => {
    if (listNotificationVisible) {
      setListNotificationVisible(false);
    } else {
      clearUnSeenNotificationCount();
      setListNotificationVisible(true);
    }
  }

  return (
    <div className="relative">
      <Badge count={unSeenNotificationCount}>
        <Button onClick={handleNotificationBtnOnClick}>
          <BellTwoTone className="line-clamp-1" />
        </Button>
      </Badge>
      {listNotificationVisible && <AppHeaderNotificationMenu
        hasMore={hasMoreNotification}
        loading={loading}
        notifications={notifications}
        setVisibility={setListNotificationVisible}
        fetchMore={() => {
          fetchData({
            variables: {
              cursor: +notifications[notifications.length - 1]?.mId,
            }
          })
        }}
        className="bg-white rounded" style={{ height: "32rem" }}
      />}
    </div>
  )
}
