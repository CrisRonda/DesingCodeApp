import React, { Component } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

const WIDTH_SCREEN = Dimensions.get("screen").width;
const HEIGHT_SCREEN = Dimensions.get("screen").height;
const mapStateToProps = state => {
  return {
    action: state.action,
    actionCard: state.actionCard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCard: () =>
      dispatch({
        type: "OPEN_CARD"
      }),
    closeCard: () =>
      dispatch({
        type: "CLOSE_CARD"
      })
  };
};
class Proyect extends Component {
  state = {
    cardWidth: new Animated.Value(315),
    cardHeight: new Animated.Value(460),
    topTitle: new Animated.Value(20),
    opacity: new Animated.Value(0),
    textHeight: new Animated.Value(100)
  };
  openCard = () => {
    const { canOpen, openCard } = this.props;
    if (!canOpen) {
      return;
    }
    const { cardHeight, cardWidth, topTitle, opacity, textHeight } = this.state;
    Animated.spring(cardWidth, {
      toValue: WIDTH_SCREEN
    }).start();
    Animated.spring(cardHeight, {
      toValue: HEIGHT_SCREEN
    }).start();
    Animated.spring(topTitle, { toValue: 60 }).start();
    Animated.spring(opacity, { toValue: 1 }).start();
    Animated.spring(textHeight, {
      toValue: 1000,
      bounciness: 0
    }).start();
    openCard();
  };
  onCloseCard = () => {
    const { cardHeight, cardWidth, topTitle, opacity, textHeight } = this.state;
    const { closeCard } = this.props;
    Animated.spring(cardWidth, {
      toValue: 315
    }).start();
    Animated.spring(cardHeight, {
      toValue: 460
    }).start();
    Animated.spring(topTitle, { toValue: 20 }).start();
    Animated.spring(opacity, { toValue: 0 }).start();
    Animated.spring(textHeight, {
      toValue: 100,
      bounciness: 0
    }).start();
    closeCard();
  };
  render() {
    const { image, title, author, text, actionCard } = this.props;
    const { cardHeight, cardWidth, topTitle, opacity, textHeight } = this.state;
    return (
      <TouchableWithoutFeedback onPress={this.openCard}>
        <AnimatedContainer
          style={{
            elevation: 12,
            width: cardWidth,
            height: cardHeight
          }}
        >
          <Cover>
            <Image source={image} />
            <AnimatedTitle style={{ top: topTitle }}>{title}</AnimatedTitle>
            <Author>{author}</Author>
          </Cover>
          <ScrollView showsVerticalScrollIndicator={false}>
            <AnimatedText
              style={{
                height: actionCard === "openCard" ? "100%" : textHeight,
                marginBottom: actionCard === "openCard" ? 32 : 0
              }}
            >
              {text}
            </AnimatedText>
          </ScrollView>
          <TouchableOpacity
            style={{ position: "absolute", top: 60, right: 20 }}
            onPress={this.onCloseCard}
          >
            <AnimatedCloseView style={{ opacity: opacity }}>
              <Ionicons name="ios-close" size={24} color="#546bfb" />
            </AnimatedCloseView>
          </TouchableOpacity>
        </AnimatedContainer>
      </TouchableWithoutFeedback>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Proyect);
const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Cover = styled.View``;
const Image = styled.Image`
  width: 100%;
  height: 290px;
`;
const Title = styled.Text`
  position: absolute;
  top: 25px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;
const AnimatedTitle = Animated.createAnimatedComponent(Title);
const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;
const AnimatedText = Animated.createAnimatedComponent(Text);
const CloseView = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`;
const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);
