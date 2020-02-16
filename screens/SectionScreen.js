import React, { Component } from "react";
import styled from "styled-components";
import { StatusBar, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-showdown";
import { PlayIcon } from "../components/Icons";
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
    const { title, image, subtitle, caption, logo, content } = section;
    return (
      <ScrollView>
        <Container>
          {/* <StatusBar hidden /> */}
          <Cover>
            <Image source={{ uri: image.url }} />
            <PlayWrapper>
              <TouchableOpacity
                underlayColor="transparent"
                onPress={() => {
                  this.props.navigation.navigate("Video");
                }}
              >
                <PlayView>
                  <PlayIcon style={{ marginLeft: -10 }} />
                </PlayView>
              </TouchableOpacity>
            </PlayWrapper>
            <Wrapper>
              <Logo source={{ uri: logo.url }} />
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
          <Content>
            {/* <WebView
            source={{ html: htmlStyles + content }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            onNavigationStateChange={event => {
              if (event.url != "about:blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          /> */}
            <Markdown
              body={content}
              pureCSS={htmlStyles}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
export default SectionScreen;
const htmlStyles = `
      * {
        font-family: -apple-system; 
            margin: 0;
            padding: 0;
        font-size: 17px; 
        font-weight: normal; 
        color: #3c4560;
        line-height: 24px;
      }
    
      h2 {
        font-size: 20px;
        text-transform: uppercase;
        color: #b8bece;
        font-weight: 600;
        margin-top: 50px;
      }
    
        p {
          margin-top: 20px;
      }
       img {
      width: 100%;
      margin-top: 20px;
        border-radius: 10px;
    }
    
      a {
        color: #4775f2;
        font-weight: 600;
        text-decoration: none;
      }
    
      strong {
        font-weight: 700;
      }
     pre {
      padding: 20px;
      background: #212C4F;
      overflow: hidden;
      word-wrap: break-word;
      border-radius: 10px;
        margin-top: 20px;
    }
    
    code {
      color: white;
    }
    `;
const htmlContent = `
  <h2>Hola mundo</h2>
  <p>Esto es un parrafo <a href="https://google.com">click</a></p>
  <img src="https://cl.ly/8861f359ed6d/download/Wave14.jpg" />
`;
const Container = styled.View`
  flex: 1;
`;
const Content = styled.View`
  height: 1000px;
  padding: 20px;
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
const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`;

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`;
