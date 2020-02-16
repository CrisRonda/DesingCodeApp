import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icons";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ModalLogin from "../components/ModalLogin";
import NotificationButton from "../components/NotificationButton";
import Notifications from "../components/Notifications";
const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        content
      }
    }
  }
`;
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };
  componentDidUpdate(prevProps, prevState) {
    this.toggleMenu();
  }
  toggleMenu = () => {
    const { action } = this.props;
    const { scale, opacity } = this.state;
    if (action == "openMenu") {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }
    if (action == "closeMenu") {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start();
      Animated.spring(opacity, {
        toValue: 1
      }).start();
      StatusBar.setBarStyle("dark-content", true);
    }
  };
  render() {
    const { openMenu, name, openLogin, action } = this.props;
    console.log(action, "Value home");
    const { scale, opacity } = this.state;
    return (
      <RootView>
        <Menu name={name} />
        <AnimatedContainer style={{ transform: [{ scale }], opacity: opacity }}>
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TitleBar>
                <TouchableOpacity
                  onPress={openLogin}
                  style={{ position: "absolute" }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Bienvenido de nuevo</Title>
                <TouchableOpacity onPress={openMenu}>
                  <Name>{name}</Name>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.openNotif()}
                  style={{ position: "absolute", right: 20, top: 5 }}
                >
                  <NotificationButton />
                </TouchableOpacity>
              </TitleBar>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
              >
                {logos.map((item, index) => (
                  <Logo key={index} image={item.image} text={item.text} />
                ))}
              </ScrollView>
              <Subtitle>Continua aprendiendo</Subtitle>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingBottom: 30 }}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Cargando...</Message>;
                    if (error) return <Message>Error...</Message>;
                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              this.props.navigation.push("Section", {
                                section: item
                              })
                            }
                          >
                            <Card
                              title={item.title}
                              image={item.image.url}
                              caption={item.caption}
                              logo={item.logo.url}
                              subtitle={item.subtitle}
                              content={item.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
              </ScrollView>
              <Subtitle>Cursos populares</Subtitle>
              {courses.map((course, index) => (
                <Course
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
        <ModalLogin />
        <Notifications />
      </RootView>
    );
  }
}
const mapStateToProps = state => ({
  action: state.action,
  name: state.name
});

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      }),
    openLogin: () =>
      dispatch({
        type: "OPEN_LOGIN"
      }),
    openNotif: () =>
      dispatch({
        type: "OPEN_NOTIF"
      })
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const RootView = styled.View`
  background-color: black;
  flex: 1;
`;
const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
`;
const AnimatedContainer = Animated.createAnimatedComponent(Container);
const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;
const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`;
const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;
const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 900;
  margin-left: 20px;
  margin-top: 8px;
  color: #b8bece;
  text-transform: uppercase;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch"
  }
];
const courses = [
  {
    title: "Prototype in InVision Studio",
    subtitle: "10 sections",
    image: require("../assets/background13.jpg"),
    logo: require("../assets/logo-studio.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Design an interactive prototype"
  },
  {
    title: "React for Designers",
    subtitle: "12 sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Learn to design and code a React site"
  },
  {
    title: "Design and Code with Framer X",
    subtitle: "10 sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption: "Create powerful design and code components for your app"
  },
  {
    title: "Design System in Figma",
    subtitle: "10 sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    author: "Meng To",
    avatar: require("../assets/avatar.jpg"),
    caption:
      "Complete guide to designing a site using a collaborative design tool"
  }
];
