import Help from "../components/Help";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import React from "react";
import { Container } from "native-base";
export default class SettingsScreen extends React.Component {
  render() {
    return (
      <Container>
        <HeaderBar />
        <Help />
        <FooterBar />
      </Container>
    );
  }
}
