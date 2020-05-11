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
import Utils from '../Utils';

class Statistics extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      emotions:[],
      data: []
    }
    this.RecordEmotionService = new RecordEmotionService();
    this.Utils = new Utils();
  }

  async componentDidMount () {
    await this.RecordEmotionService.getAllStatistics(res => {
  
      if (res.status === 200) {
        const { payload } = res.data
        console.log(res.data.emotions);
        Moment.locale('en');
        let date = res.data.date;
        this.setState({date: Moment(date).format('DD MMMM YYYY hh:mm'), emotions: res.data.emotions});
        this.setChartData();
      }
    })
  }
  async setChartData(){
    let data = [];
    for (let emotion of this.state.emotions){
      let name = emotion.name;
      let color = this.Utils.getEmotionColor(name);
      let percentage = emotion.percentage
      data.push({name: name, percentage:percentage, color: color, legendFontColor: color, legendFontSize: 12});

    }

    this.setState({data: data});
  }
  render () {


    return (
      <View>
        <PieChart
          data={this.state.data}
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
