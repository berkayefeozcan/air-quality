import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import Store from '../store/store';
import MQTTConnecter from '../MQTTConnecter';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const DataScreen = ({route, navigation}) => {
  const {brokerIp, serverUserName} = route.params;

  useEffect(() => {
    MQTTConnecter.connect(brokerIp, serverUserName);
    return () => {
        //MQTTConnecter.closeConnection();
    }
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
            marginVertical: 15,
          }}>
          {`MQ2 Verileri `}
          <Text
            style={{
              fontSize: 17,
              color: 'white',
              fontWeight: '300',
            }}>
            (Yanıcı gaz,sigara)
          </Text>
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'white'}}>
          {Store.mq2_veriler[Store.mq2_veriler.length - 1] /* < 250
            ? Store.mq2_veriler[Store.mq2_veriler.length - 1] + ' Hava temiz'
            : Store.mq2_veriler[Store.mq2_veriler.length - 1] < 300
            ? Store.mq2_veriler[Store.mq2_veriler.length - 1] + ' Hava dumanli'
            : Store.mq2_veriler[Store.mq2_veriler.length - 1] +
              ' Hava cok dumanli'} */}
        </Text>
        <LineChart
          data={{
            labels: Store.mq2_labels,
            datasets: [
              {
                data: [...Store.mq2_veriler],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20} // from react-native
          height={350}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#3ba676',
            backgroundGradientFrom: '#4cc48f',
            backgroundGradientTo: '#77daaf',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          width: Dimensions.get('window').width - 30,
          marginVertical: 5,
        }}
      />
      <View style={{alignItems:"center",justifyContent:'center',flex:1}}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {`MQ135 Verisi `}
          <Text
            style={{
              fontSize: 17,
              color: 'white',
              fontWeight: '300',
            }}>
            {`(Zehirli gaz)(D): `} 
          </Text>
          <Text
            style={{
              fontSize: 19,
              color: 'white',
              fontWeight: '500',
            }}>
            {Store.mq135_veri} 
          </Text>
        </Text>
      </View>
    
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
  },
});
export default observer(DataScreen);
