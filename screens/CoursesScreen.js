import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "react-native";
class CoursesScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Text>Courses Screen</Text>
      </Container>
    );
  }
}
export default CoursesScreen;
const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.5);
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: white;
`;
