import { message } from 'antd';

function ToastComponent(title: string) {
  return (
    message.info(title)
  );
};

export default ToastComponent;