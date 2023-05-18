import { Button, Form, Input, message } from "antd"
import { classNames } from "../utils";
import { apiInstance } from "../api";

interface IHomeEmailSubscribeFormProps {
  className?: string;
  style?: React.CSSProperties;
}

export const HomeEmailSubscribeForm = (props: IHomeEmailSubscribeFormProps) => {
  const [form] = Form.useForm()

  const onFinish = async ({ email }: { email: string }) => {
    apiInstance.subscribeEmail(email)
      .then(_ => {
        message.success("You have subscribed successfully!")
        form.resetFields()
      })
  }
  return (
    <div
      className={classNames(props.className, "mx-auto mt-16")}
    >
      <h2 className="text-xl font-semibold text-center">Subscribe to The Forest Fire Prediction System</h2>
      <p className="text-center">Subscribe to get the lastest warning of forestfires </p>
      <Form
        form={form}
        name="email-subscribe"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{
            required: true,
            message: 'Please input your email!',
          }]}
        >
          <Input className="h-10" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-500 w-full h-10">
            Subscribe
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
