import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native'
import {
 
  PieChart,
} from 'react-native-chart-kit'
import {Text} from 'native-base'
import { withNavigation } from 'react-navigation'
import RecordEmotionService from '../services/RecordEmotionService'
import Moment from 'moment';

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      emotions:[],
    }
    this.RecordEmotionService = new RecordEmotionService()
  }

  async componentDidMount () {
    await this.RecordEmotionService.getAllStatistics(res => {
  
      if (res.status === 200) {
        const { payload } = res.data
        Moment.locale('en');
        let date = res.data.date;
        this.setState({date: Moment(date).format('DD MMMM YYYY hh:mm'), emotions: res.data.emotions});
      }
    })
  }
  render () {

    const data = [
      {
        name: 'fearfull',
        percentage: 4.55,
        color: '#CD82AD',
        legendFontColor: '#CD82AD',
        legendFontSize: 12
      },
      {
        name: 'angry',
        percentage: 9.09,
        color: '#CC4748',
        legendFontColor: '#CC4748',
        legendFontSize: 12
      },
      {
        name: 'happy',
        percentage: 22.73,
        color: '#84B761',
        legendFontColor: '#84B761',
        legendFontSize: 12
      },
      {
        name: 'neutral',
        percentage: 27.27,
        color: '#FDD400',
        legendFontColor: '#FDD400',
        legendFontSize: 12
      },
      {
        name: 'sad',
        percentage: 36.36,
        color: '#67B7DC',
        legendFontColor: '#67B7DC',
        legendFontSize: 12
      }
    ]

    return (
      <View>
        <PieChart
          data={data}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          accessor='percentage'
          backgroundColor='transparent'
          paddingLeft='15'
          absolute
        />
        <Text style={styles.date}>{this.state.date}</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  },
  date: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8b4da9',
    paddingTop: 15, 
  }
})
export default withNavigation(Statistics)
