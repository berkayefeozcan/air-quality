import Store from './store/store';
import * as Mqtt from 'react-native-native-mqtt';
import {Alert} from 'react-native';
import * as RootNavigation from './RootNavigation.js';

const showAlert = (title, msg) =>
  Alert.alert(title, msg, [
    {
      text: 'Kapat',
      onDismiss: () => Alert.alert('Cancel Pressed'),
      style: 'cancel',
      cancelable: true,
    },
  ]);
class MQTTConnecter {
  constructor() {
    this.client = null;
  }
  connect(serverip, username) {
    this.client = new Mqtt.Client(`tcp://${serverip}:1883`);
    this.client.connect(
      {
        clientId: 'CLIENT_ID_'+(Math.random()*100),
        username: username,
      },
      err => {
        if (err === undefined) {
          showAlert('Başarılı', 'Mqtt broker ile bağlantı sağlandı');
        } else {
          this.closeConnection();
          RootNavigation.navigate('Home', {});
          showAlert(
            'Hata!!',
            'Bağlantı başarısız. Lütfen bağlantı verilerini doğru girin.',
          );
        }
        Store.clearAllData();
      },
    );

    this.client.on(Mqtt.Event.Connect, () => {
      console.log('MQTT Connect');
      this.client.subscribe(['iot_proje/mq135'], [1]);
      this.client.subscribe(['iot_proje/mq2'], [1]);
    });

    this.client.on(Mqtt.Event.Error, error => {
      console.log('MQTT Error:', error);
    });

    this.client.on(Mqtt.Event.Disconnect, cause => {
      console.log('MQTT Disconnect:', cause);
    });
    this.client.on(Mqtt.Event.Message, (topic, message) => {
      if ('iot_proje/mq2' == topic) {
        Store.pushMQ2data(parseInt(message.toString()));
      }
      if ('iot_proje/mq135' == topic) {
        // Store.pushMQ135data(parseInt(message.toString()));
        Store.mq135_veri=message.toString();
      }

      //   console.log('Mqtt Message:', topic, message.toString());
    });
  }
  closeConnection() {
    try {
      this.client.unsubscribe(['iot_proje/mq2']);
      this.client.unsubscribe(['iot_proje/mq135']);
      this.client.disconnect();
    } catch (err) {}
  }
}
export default new MQTTConnecter();
