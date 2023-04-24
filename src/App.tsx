import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Link, RouteObject, useRoutes } from "react-router-dom"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home, NotFound } from "./pages";
import 'antd/dist/reset.css'
import { Layout } from "antd";

const queryClient = new QueryClient();

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Link to='/' className="flex float-left my-4 space-x-1" >
            <img className="h-8" title="Forest Fire Prediction Logo" src="/logo.svg" />
            <h3 className="text-white font-bold leading-8 text-xl">PreFire</h3>
          </Link>
          <h3 className="text-white float-right">Menu here</h3>
        </Header>
        <Content className="py-8 px-2 md:px-4">
          <QueryClientProvider client={queryClient}>
            <AppRouter />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Content>
        <Footer className="text-center">PreFire ©{new Date().getFullYear()} Created by <Link to='/about'>...</Link></Footer>
      </Layout>
    </BrowserRouter>
  )
}

function AppRouter() {
  const routes: RouteObject[] = [
    {
      children: [
        { element: <Home />, index: true },
        { element: <NotFound />, path: '*' },
      ],
    },
  ];

  const router = useRoutes(routes);
  return router;
}

export default App
