import Event from '../components/Event'
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class EventScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <HeaderBar />
        <Content>
          <Event />
        </Content>
        <FooterBar />
      </Container>
    )
  }
}

export default withNavigation(EventScreen);
