import React, { Component } from 'react'
import {
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  View,
  Dimensions
} from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import SliderBar from './Slider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
})
export default class Statistics extends Component {
  render () {
    const chart_wh = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']

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
        <SliderBar />
      </View>
    )
  }
}
