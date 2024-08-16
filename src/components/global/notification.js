
import { Form, Input, Button, Checkbox, notification } from 'antd';

notification.config({
  placement: 'topBottom',
  bottom: 50,
  duration: 3,
});


export const notificationFunc = (type, message) => {
  notification[type]({
    message: message,
  });
};



