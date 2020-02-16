import React from "react";
import styled from "styled-components";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions
} from "react-native";
import Success from "./Succed";
import Loading from "./Loading";
import { connect } from "react-redux";
import firebase from "./Firebase";
const mapStateToProps = state => ({
  action: state.action
});

const mapDispatchToProps = dispatch => {
  return {
    closeLogin: () => dispatch({ type: "CLOSE_LOGIN" })
  };
};

const screenHeight = Dimensions.get("window").height + 300;
class ModalLogin extends React.Component {
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    iconPassword: require("../assets/icon-password.png"),
    isSuccessful: false,
    isLoading: false,
    top: new Animated.Value(screenHeight),
    scale: new Animated.Value(1.5),
    translateY: new Animated.Value(0)
  };
  componentDidUpdate() {
    const { action } = this.props;
    const { top, scale, translateY } = this.state;
    if (action == "openLogin") {
      Animated.timing(top, {
        toValue: 0,
        duration: 0
      }).start();
      Animated.spring(scale, {
        toValue: 1
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0
      }).start();
    } else {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight,
          duration: 0
        }).start();
        Animated.spring(scale, {
          toValue: 1.7
        }).start();
      }, 500);
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 200
      }).start();
    }
  }
  handleLogin = () => {
    const { email, password } = this.state;
    const { closeLogin } = this.props;
    // Start loading
    this.setState({ isLoading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => {
        Alert.alert("Error", "Usuario o password incorrectos");
      })
      .then(resp => {
        this.setState({ isLoading: false });
        if (resp) {
          this.setState({ isSuccessful: true });
          // Alert.alert("Felicidades", "Ha iniciado sesión correctamente!");
          setTimeout(() => {
            closeLogin();
            this.setState({ isSuccessful: false });
          }, 1000);
        }
      });
    // Simulate API Call
    // setTimeout(() => {
    // // Stop loading and show success
    // this.setState({ isLoading: false });
    // this.setState({ isSuccessful: true });
    // Alert.alert("Felicidades", "Ha iniciado sesión correctamente!");
    // setTimeout(() => {
    // closeLogin();
    // this.setState({ isSuccessful: false });
    // }, 1000);
    // }, 2000);
    // this.setState({ isSuccessful: false });
  };
  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      iconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      iconPassword: require("../assets/icon-password-animated.gif")
    });
  };
  tapBackground = () => {
    Keyboard.dismiss();
    this.props.closeLogin();
  };
  render() {
    const { iconEmail, iconPassword, isSuccessful, isLoading } = this.state;
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <MyBlurView
            style={{ position: "absolute", width: "100%", height: "100%" }}
          />
        </TouchableWithoutFeedback>
        <AnimatedModal
          style={{
            transform: [
              {
                scale: this.state.scale
              },
              {
                translateY: this.state.translateY
              }
            ]
          }}
        >
          <Logo source={require("../assets/logo-dc.png")} />
          <Text>Start Learning. Access Pro Content.</Text>
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <IconEmail source={iconEmail} />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconPassword source={iconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <ButtonView style={{ elevation: 12 }}>
              <ButtonText>Log in</ButtonText>
            </ButtonView>
          </TouchableOpacity>
        </AnimatedModal>
        <Success isActive={isSuccessful} />
        <Loading isActive={isLoading} />
      </AnimatedContainer>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const MyBlurView = styled.View``;
const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  padding-left: 44px;
  margin-top: 20px;
`;

const Modal = styled.View`
  width: 335px;
  height: 370px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  align-items: center;
`;
const AnimatedModal = Animated.createAnimatedComponent(Modal);
const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  color: #b8bece;
  text-align: center;
`;

const ButtonView = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0 10px 20px #c2cbff;
`;

const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 20px;
`;
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`;
