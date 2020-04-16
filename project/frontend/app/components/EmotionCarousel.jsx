import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, Image } from 'react-native';

import Carousel from 'react-native-snap-carousel';

export default class EmotionCarousel extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              path: require('../assets/angry.png'),
              name: 'angry',
          },
          {
            path: require('../assets/happy.png'),
            name:'happy',

          },
          {
            path: require('../assets/confused.png'),
            name: 'confused',
          },
          {
            path: require('../assets/crying.png'),
            name:'crying',
          },
          {
            path: require('../assets/scare.png'),
            name: 'scare',
          },
        ]
      }
    }

    _renderItem({item,index}){

        return (
          <View style= {{width: 300, height:300, justifyContent:'center',}}>
              <Image source={item.path} style={{flex:1 ,  width: undefined, height: undefined}} />
              <Text>{item.name}</Text>
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={300}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

