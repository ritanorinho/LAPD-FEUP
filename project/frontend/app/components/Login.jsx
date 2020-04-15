import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Card,
  Text,
  Button
} from 'native-base'
import { withNavigation } from 'react-navigation'

class Login extends Component {
  
  static navigationOptions={
    title: 'Login'
  }
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Card transparent style={styles.item}>
          <Image style={styles.image} source={require('../assets/logo.png')} />
          <Form>
            <Label style={styles.label}> EMAIL </Label>
            <Item rounded>
              <Input />
            </Item>
            <Label style={styles.label}>PASSWORD</Label>
            <Item rounded>
              <Input style={styles.input}/>
            </Item>
            <Item style={styles.textItem}>
              <Text style={styles.grayText}> Don't have an account? </Text>
            </Item>
            <Item style={styles.textItem}>
              <Text style={styles.purpleText} onPress={() =>this.props.navigation.navigate('Register')}>Create one!</Text>
            </Item>
            <Button style={styles.button} rounded onPress={() =>this.props.navigation.navigate('Profile')}>
              <Text>LOGIN</Text>
            </Button>
          </Form>
        </Card>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
    item: {
      paddingLeft: 20,
      paddingRight: 20,
      justifyContent: 'center',
      flex: 1
    },
    image: {
      marginBottom: 20,
      alignSelf: 'center'
    },
    textItem: {
      alignSelf: 'center',
      justifyContent: 'center',
      borderColor: 'transparent',
      marginTop: 5,
    },
    button: {
      backgroundColor: '#8b4da9',
      marginTop: 10,
      justifyContent: 'center'
    },
    purpleText: {
      color: '#8b4da9',
      fontWeight: 'bold',
    },
    label: {
      color: '#8b4da9',
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 5,
  
    },
    grayText: {
      color: 'gray',
      fontWeight: 'bold'
    },
    
  })

  export default withNavigation(Login);
  