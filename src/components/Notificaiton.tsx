import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Notificaiton extends React.Component {
  render() {
    return () => {
      switch (this.props.type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', this.props.msg);
          break;
        case 'warning':
          NotificationManager.warning('Warning message',  this.props.msg, 3000);
          break;
        case 'error':
          NotificationManager.error('Error message',  this.props.msg, 5000, () => {
            alert('callback');
          });
          break;
      }
  
  }
  }
};
export default Notificaiton
