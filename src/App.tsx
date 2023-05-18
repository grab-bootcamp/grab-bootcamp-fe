import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom"
import { HomePage, NotFoundPage, UnsubscribePage } from "./pages";
import { Button, Layout, Space, message, notification } from "antd";
import { AppHeader, AppFooter } from "./components";
import { gql, useQuery } from "@apollo/client";
import { useStateStore } from "./store";
import { LoadingPage } from "./pages/loading.page";
import { useEffect } from "react";
import { EventStreamContentType, fetchEventSource } from "@microsoft/fetch-event-source";
import { INotification } from "./interfaces";
import { nanoid } from "nanoid";
import { mapNotificationSeverityToBgColor, mapNotificationTypeToIcon } from "./utils";

const { Content } = Layout;

const GET_ALL_FORESTS = gql`
  query GetAllForests {
    forest {
      mId
      mName
      mCoordinates
    }
  }`

function App() {
  const { setForest, setActiveForestIndexByForestId, prependNotifications } = useStateStore(state => ({
    setForest: state.setForests,
    setActiveForestIndexByForestId: state.setActiveForestIndexByForestId,
    prependNotifications: state.prependNotifications
  }));

  const [notificationApi, notificationContextHolder] = notification.useNotification();

  const { loading, error } = useQuery(GET_ALL_FORESTS, {
    onCompleted: (data) => {
      setForest(data.forest);
    }
  });

  useEffect(() => {
    const fetchSee = async () => {
      await fetchEventSource(import.meta.env.VITE_API_URL + '/sse', {
        async onopen(response) {
          if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
            return;
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            const responseBody = await (response.json());
            message.error(responseBody['message']);
          }
        },
        onmessage(response) {
          switch (response.event) {
            case 'notification':
              const payload = JSON.parse(response.data) as INotification;
              console.log('payload: ', payload);
              fireNotification(payload);
              prependNotifications([{ ...payload }])
              break;
            default:
              console.log('response: ', response);
              break;
          }
        },
        onclose() {
          message.info('Disconnected from server, reconnecting...');
        },
        onerror(err: Error) {
          message.error('Error encountered, reconnecting...');
          console.error(err);
        },
      })
    }

    fetchSee();
  }, [])

  const fireNotification = (notification: INotification) => {
    const key = nanoid();

    const extendedArgs: { btn?: React.ReactNode, onClick?: () => void } = {};
    if (notification.mForestId) {
      const onClick = () => {
        if (notification.mForestId) {
          setActiveForestIndexByForestId(notification.mForestId)
        }
        notificationApi.destroy(key)
      }

      extendedArgs['btn'] = (
        <Space>
          <Button className="bg-green-400 hover:bg-green-500 active:bg-green-600" type="primary" size="small" >
            Go to forest
          </Button>
        </Space>
      )

      extendedArgs['onClick'] = onClick
    }

    notificationApi.open({
      message: notification.mTitle,
      description: notification.mBody,
      icon: mapNotificationTypeToIcon[notification.mType],
      className: mapNotificationSeverityToBgColor[notification.mSeverity],
      key,
      ...extendedArgs
    })
  }

  if (loading) return <LoadingPage />;
  if (error) return <p>Error : {error.message}</p>;

  return (

    <BrowserRouter>
      <Layout>
        {notificationContextHolder}
        <AppHeader />
        <Content className="py-8 px-2 md:px-4">
          <AppRouter />
        </Content>
        <AppFooter />
      </Layout>
    </BrowserRouter>
  )
}

function AppRouter() {
  const routes: RouteObject[] = [
    {
      children: [
        { element: <HomePage />, index: true },
        { element: <UnsubscribePage />, path: 'unsubscribe/:disposeToken' },
        { element: <NotFoundPage />, path: '*' },
      ],
    },
  ];

  const router = useRoutes(routes);
  return router;
}

export default App
