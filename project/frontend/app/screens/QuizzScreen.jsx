import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import React from "react";
import { Container } from "native-base";
import Quizz from "../components/Quizz";
export default class QuizzScreeen extends React.Component {
  render() {
    return (
      <Container>
        <HeaderBar />
        <Quizz />
        <FooterBar />
      </Container>
    );
  }
}
