import React, { Component } from "react";
import styled from "styled-components";
import { StatusBar, TouchableOpacity } from "react-native";
import { Ionicons, createMultiStyleIconSet } from "@expo/vector-icons";
class SectionScreen extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }
  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }
  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");
    const { title, image, subtitle, caption, logo } = section;
    return (
      <Container>
        {/* <StatusBar hidden /> */}
        <Cover>
          <Image source={image} />
          <Wrapper>
            <Logo source={logo} />
            <Subtitle>{subtitle} </Subtitle>
          </Wrapper>
          <Title>{title}</Title>
          <Caption>{caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ position: "absolute", right: 20, top: 40 }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={30}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
      </Container>
    );
  }
}
export default SectionScreen;
const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background: #3c4560;
`;
const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;
const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 8px;
  text-transform: uppercase;
`;
const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`;

const Caption = styled.Text`
  color: white;
  font-size: 17;
  position: absolute;
  bottom: 20px;
  left: 20px;
  max-width: 300px;
`;
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`;
