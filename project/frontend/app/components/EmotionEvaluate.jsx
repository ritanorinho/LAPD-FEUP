import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Camera } from 'expo-camera'
import * as Permissions from 'expo-permissions'
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { withNavigation } from 'react-navigation'
import DetectService from "../services/DetectService";

class EmotionEvaluate extends Component {
  

  static navigationOptions = {
    title: 'EmotionEvaluate'
  }
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    photo: '',
  }
  constructor(props){
    super(props);
    this.DetectService = new DetectService();
 
  }

  async componentDidMount () {
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasPermission: status === 'granted' })
  }

  handleCameraType = () => {
    const { cameraType } = this.state

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({ base64: true, quality: 0.1, })
      this.setState({photo: photo});
      this.DetectService.sendPhoto(this.state.photo, async (res) => {
        if(res.status === 200){
        this.props.navigation.navigate('Result');
        }
      })
    
    }
  }

  pickImage = async () => {
    console.log("pick image");
    let photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true, 
      quality: 0.1,
    })
    this.setState({photo: photo});
    this.DetectService.sendPhoto(this.state.photo, async (res) => {
      if(res.status === 200){
        this.props.navigation.navigate('Result');
        }
      })
    
  }

  render () {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.pickImage()}
              >
                <Ionicons
                  name='ios-photos'
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.takePicture()}
              >
                <FontAwesome
                  name='camera'
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name='camera-switch'
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      )
    }
  }
}
export default withNavigation(EmotionEvaluate)
