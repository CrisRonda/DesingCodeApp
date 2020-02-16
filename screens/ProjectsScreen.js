import React, { Component } from "react";
import styled from "styled-components";
import Proyect from "../components/Proyect";
import { PanResponder, Animated } from "react-native";
import { connect } from "react-redux";

function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return nextIndex;
}
class ProjectsScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0,
    opacity: new Animated.Value(0)
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        const { actionCard } = this.props;
        if (gestureState.dx === 0 && gestureState.dy === 0) {
          return false;
        } else {
          if (actionCard == "openCard") {
            return false;
          } else {
            return true;
          }
        }
      },
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, {
          toValue: 1
        }).start();
        Animated.spring(this.state.translateY, {
          toValue: 0
        }).start();
        //3ra card
        Animated.spring(this.state.thirdScale, {
          toValue: 0.9
        }).start();
        Animated.spring(this.state.thirdTranslateY, {
          toValue: 44
        }).start();
        Animated.timing(this.state.opacity, { toValue: 1 }).start();
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();
        Animated.timing(this.state.opacity, {
          toValue: 0
        }).start();

        if (positionY > 250) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 999 }
          }).start(() => {
            this.state.pan.setValue({
              x: 0,
              y: 0
            });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({
              index: getNextIndex(this.state.index)
            });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();
          Animated.spring(this.state.scale, {
            toValue: 0.9
          }).start();
          Animated.spring(this.state.translateY, {
            toValue: 44
          }).start();
          //3ra card
          Animated.spring(this.state.thirdScale, {
            toValue: 0.8
          }).start();
          Animated.spring(this.state.thirdTranslateY, {
            toValue: -50
          }).start();
        }
      }
    });
  }
  render() {
    return (
      <Container>
        <AnimatedMask style={{ opacity: this.state.opacity }} />
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Proyect
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
            canOpen={true}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Proyect
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          <Proyect
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
          />
        </Animated.View>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    actionCard: state.actionCard
  };
};
export default connect(mapStateToProps)(ProjectsScreen);
const Container = styled.View`
  background-color: #f0f3f5;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Text = styled.Text`
  color: white;
`;
const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: -3;
`;

const AnimatedMask = Animated.createAnimatedComponent(Mask);
const projects = [
  {
    title: "Price Tag",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet rutrum quam. Vestibulum malesuada sem sed elit rhoncus, eu semper odio efficitur. Vivamus quis turpis sit amet orci pharetra tempor. Nulla facilisi. Nunc pellentesque semper felis, aliquet faucibus orci vestibulum rhoncus. Nullam eu malesuada dui. Suspendisse aliquam tempor eros quis finibus. Sed sit amet magna quis augue luctus fermentum. Proin ac felis lacus. Nulla justo mi, lobortis sit amet mauris at, iaculis aliquet augue. Mauris tempor massa interdum tortor dictum, ut porttitor turpis imperdiet.

Maecenas libero nibh, euismod non magna et, aliquam lacinia augue. Ut ut sagittis lectus. Praesent at odio varius, lacinia tellus semper, porta mauris. Nulla facilisi. In sem elit, feugiat in porttitor vitae, dignissim sed purus. Pellentesque tincidunt pretium elit sit amet aliquam. Nunc quis ullamcorper nunc. Pellentesque id suscipit ligula, quis egestas velit. Aenean enim nisl, tempus at est eu, iaculis convallis felis. Nulla elit leo, condimentum ac nisl non, molestie tempor justo. In sollicitudin augue in lectus auctor ornare.

Donec porta nunc vel malesuada finibus. Aliquam erat volutpat. Nunc sit amet dui felis. Maecenas in lacus nec elit lobortis vestibulum. In eros mauris, dapibus a aliquam a, ultrices in augue. In non diam ornare, aliquet arcu consectetur, suscipit eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at pharetra sem, ut tincidunt velit.

Nam vel congue lorem. Etiam nec mauris sem. Proin at tincidunt libero, nec auctor erat. Duis quis justo vitae libero ultrices fringilla eget eu nisi. Nunc interdum finibus imperdiet. Proin elit nisl, blandit vel aliquet sed, dictum tincidunt tortor. Vivamus eleifend risus ligula, non malesuada metus tempus eget. Morbi ut lacus interdum, tincidunt ante quis, tristique est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent in sagittis metus, ut malesuada massa. Maecenas id eleifend orci. Aliquam ullamcorper, arcu id sollicitudin facilisis, arcu enim mollis sem, sed fermentum arcu dolor non nibh. Pellentesque dignissim scelerisque consectetur.

Vestibulum feugiat diam et nibh euismod, ac consequat lorem elementum. Fusce vel congue odio. Cras eu tellus pretium, mollis est sed, lobortis leo. Morbi mauris dolor, egestas a placerat et, euismod non purus. Sed consequat viverra nisl sed tempor. Nulla sed accumsan libero. Curabitur elementum orci sit amet iaculis suscipit. Praesent dapibus condimentum quam id cursus. Donec quis ex vel quam lobortis posuere. Duis finibus tempus tellus ut convallis.

In sapien elit, pharetra quis urna ut, fermentum volutpat ligula. Nam at justo est. Nunc iaculis sapien eget libero convallis lacinia. Aliquam erat volutpat. Suspendisse velit enim, laoreet sit amet eros a, rhoncus tristique libero. Suspendisse sagittis, ante et porta fringilla, risus tellus facilisis diam, non venenatis mauris mauris eu ligula. Aenean vitae erat id sem ullamcorper cursus. Nullam sollicitudin justo eget aliquet viverra.

Morbi quis nunc sit amet risus eleifend dignissim. Sed urna dui, tincidunt eget eros sit amet, scelerisque suscipit erat. Nulla blandit mi et felis interdum volutpat. Mauris non aliquam dui. Vivamus fringilla a purus quis congue. Etiam euismod id tellus vel euismod. Praesent quis venenatis est. Etiam venenatis diam eget tortor elementum sagittis. Quisque auctor urna lacus. Nam vitae suscipit justo. Nulla tincidunt, turpis eget eleifend fringilla, nibh justo convallis enim, id elementum enim justo finibus neque. Phasellus imperdiet congue justo in pellentesque. Morbi maximus, elit vel feugiat imperdiet, lorem felis suscipit sem, eget hendrerit purus risus ac nulla. Suspendisse potenti. Sed imperdiet quam eget sollicitudin aliquam.

Cras vitae pulvinar magna, quis sagittis quam. Pellentesque iaculis dui et lorem scelerisque, ut sollicitudin eros elementum. Integer fermentum ultrices arcu in feugiat. Nunc nec lorem imperdiet, ultricies arcu ac, condimentum felis. Aliquam erat volutpat. Vestibulum cursus ipsum non sem consequat vulputate. Nam pulvinar, neque a vulputate sagittis, tortor sem luctus lacus, id fringilla nisl ligula a libero. Vivamus quis nisi at enim rutrum dignissim. Aliquam mattis rutrum porttitor. Vestibulum et ipsum id quam egestas porttitor id eu est. Sed a libero eu eros lobortis faucibus sit amet sollicitudin velit.

Integer pharetra lobortis risus, vel aliquam ante fermentum id. Fusce a magna et metus lacinia semper eget non sem. Nunc id nibh non est porta rhoncus sit amet at nunc. Duis ullamcorper ultricies ultricies. Quisque blandit imperdiet sapien sit amet euismod. In finibus purus et mi dictum aliquam. Duis eget lobortis ligula, scelerisque accumsan arcu. Aliquam viverra est eget dui dapibus tempor. Ut pharetra enim ac mauris consequat feugiat. Proin quam risus, euismod eu sapien in, accumsan sodales leo. Vivamus non euismod nibh, sit amet laoreet libero. Praesent id sem eget eros commodo sagittis.

Mauris accumsan, diam eget mattis euismod, risus ligula pellentesque dolor, at venenatis nibh turpis et ante. Aliquam porttitor sodales tortor. Morbi aliquam orci id volutpat lobortis. Cras vehicula diam id varius venenatis. Proin feugiat mattis nibh, quis tempus urna volutpat quis. Fusce finibus vel risus eget malesuada. Morbi turpis mauris, pretium sed eros sed, pellentesque mollis tortor.`
  },
  {
    title: "The DM App - Ananoumous Chat",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. "
  },
  {
    title: "Nikhiljay",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it."
  },
  {
    title: "Nuevo curso 1",
    image: require("../assets/background5.jpg"),
    author: "Liu Yi",
    text:
      "Thanks to Design+Code, I improved my design skill and learned to do animations for my app Price Tag, a top news app in China."
  },
  {
    title: "Vue JS",
    image: require("../assets/background6.jpg"),
    author: "Chad Goodman",
    text:
      "Design+Code was the first resource I used when breaking into software. I went from knowing nothing about design or code to building a production ready app from scratch. "
  },
  {
    title: "Flutter",
    image: require("../assets/background7.jpg"),
    author: "Nikhil D'Souza",
    text:
      "Recently finished the React course by @Mengto, and I 10/10 would recommend. I already rewrote my personal website in @reactjs and I'm very excited with it."
  }
];
