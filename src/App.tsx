import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom"
import { HomePage, NotFoundPage } from "./pages";
import 'antd/dist/reset.css'
import { Layout } from "antd";
import { AppHeader, AppFooter } from "./components";
import { gql, useQuery } from "@apollo/client";
import { useStateStore } from "./store";
import { useEffect } from "react";
import { LoadingPage } from "./pages/loading.page";

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
  const { setForest } = useStateStore(state => ({ setForest: state.setForest }));
  const { loading, error } = useQuery(GET_ALL_FORESTS, {
    onCompleted: (data) => {
      setForest(data.forest);
    }
  });

  if (loading) return <LoadingPage />;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <BrowserRouter>
      <Layout>
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
        { element: <NotFoundPage />, path: '*' },
      ],
    },
  ];

  const router = useRoutes(routes);
  return router;
}

export default App
