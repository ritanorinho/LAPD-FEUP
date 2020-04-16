import React, { Component } from 'react'
import Slider from 'react-native-slider';
import {
  StyleSheet,
  View,
  Text } from 'react-native';
import { withNavigation } from 'react-navigation';

  class SliderBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: 0.2, 
        }
    }

 
  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={(value) => this.setState({value})} thumbTintColor='#9C67B6' minimumTrackTintColor= '#9C67B6'/>
           <View style={styles.rowContainer}>
          <View style={styles.rowItem}>
          <Text style ={styles.text}>MAR 2019</Text>
          </View>
          <View style={styles.rowItem}>
          <Text style ={styles.text}>JUN 2019</Text>
          </View>
          <View style={styles.rowItem}>
          <Text style ={styles.text}>SEP 2019</Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20, 
  },
  text : {
      color: '#CBCBCB',  
  }, 
  rowContainer: {
    flex: 1,
    flexDirection: 'row', 
  },
  rowItem: {
    flex: 1, 
    
  },
});

export default withNavigation(Slider);