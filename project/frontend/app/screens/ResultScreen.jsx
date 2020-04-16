
import HeaderBar from '../components/HeaderBar'
import FooterBar from '../components/FooterBar'
import React from 'react'
import { Container, Content } from 'native-base'
import Result from '../components/Result'
export default class ResultScreen extends React.Component {
  render () {
    return (
      <Container>
        <HeaderBar />
       <Result />
        <FooterBar />
      </Container>
    )
  }
}
