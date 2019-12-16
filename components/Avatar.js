import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const URL_FETCH = "https://uinames.com/api/?ext&gender=female&region=spain";
const mapStateToProps = state => {
  return {
    name: state.name
  };
};

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
}
class Avatar extends Component {
  state = {
    photo:
      "https://www.trzcacak.rs/myfile/full/214-2143887_png-file-svg-transparent-user-icon-png.png"
  };
  componentDidMount() {
    const { updateName } = this.props;
    fetch(URL_FETCH)
      .then(response => response.json())
      .then(response => {
        this.setState({
          photo: response.photo
        });
        updateName(response.name);
      });
  }
  render() {
    const { photo } = this.state;
    return <Image source={{ uri: photo }} />;
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
