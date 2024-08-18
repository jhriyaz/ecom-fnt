
import { Form, Input, Button, Checkbox, notification } from 'antd';

notification.config({
  placement: 'topRight',
  bottom: 50,
  duration: 3,
  // rtl: true,
});


export const notificationFunc = (type, message) => {
  notification[type]({
    message: message,
  });
};



