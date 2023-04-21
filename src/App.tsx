import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Link, RouteObject, useRoutes } from "react-router-dom"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Home, NotFound } from "./pages";

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <nav className='router-links'>
            <Link to='/'>home</Link>
            <Link to='/2'>Page 2</Link>
            <Link to='/3'>Page 3</Link>
            <Link to='/404'>404 Test</Link>
          </nav>
          <AppRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  )
}

function AppRouter() {
  const routes: RouteObject[] = [
    {
      children: [
        { element: <Home />, index: true },
        { element: <h2>Page 2</h2>, path: '/2' },
        { element: <h2>Page 3</h2>, path: '/3' },
        { element: <NotFound />, path: '*' },
      ],
    },
  ];

  const router = useRoutes(routes);
  return router;
}

export default App
