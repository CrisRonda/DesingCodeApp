import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "react-native";
class ProjectsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Container>
        <Text>Projects Screen</Text>
      </Container>
    );
  }
}
export default ProjectsScreen;
const Container = styled.View`
  background-color: rgba(0, 0, 0, 0.75);
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: white;
`;
