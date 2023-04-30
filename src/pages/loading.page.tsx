import { Spin } from "antd";


export const LoadingPage = () => (
  <div
    className="flex h-screen items-center justify-center">
    <Spin tip="Loading" size="large" />
  </div>
);

