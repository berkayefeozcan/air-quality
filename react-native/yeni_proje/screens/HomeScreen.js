import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [brokerIp, setBrokerIp] = useState('192.168.43.219');
  const [serverUserName, setServerUserName] = useState('nodemcu');
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Hava Kalitesi</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          defaultValue={brokerIp}
          placeholder="Broker Ip"
          placeholderTextColor="#003f5c"
          onChangeText={text => setBrokerIp(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput          
          defaultValue={serverUserName}
          style={styles.inputText}
          placeholder="Server User Name"
          placeholderTextColor="#003f5c"
          onChangeText={text => setServerUserName(text)}
        />
      </View>
      {/* <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({password: text})}
        />
      </View> */}

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          navigation.navigate('Data', {
            brokerIp: brokerIp,
            serverUserName: serverUserName,
          });
        }}>
        <Text style={styles.loginText}>Bağlan</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});
export default HomeScreen;
