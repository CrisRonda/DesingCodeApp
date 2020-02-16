import React from "react";
import styled from "styled-components";

const Card = props => {
  const { image, title, logo, caption, subtitle } = props;
  return (
    <Container style={{ elevation: 10 }}>
      <Cover>
        <Image source={{ uri: image }} />
        <Title>{title}</Title>
      </Cover>
      <Content>
        <Logo source={{ uri: logo }} />
        <Wrapper>
          <Caption>{caption}</Caption>
          <Subtitle>{subtitle}</Subtitle>
        </Wrapper>
      </Content>
    </Container>
  );
};
export default Card;
const Container = styled.View`
  background-color: white;
  width: 315px;
  height: 280px;
  border-radius: 14px;
  margin: 20px 10px;
  box-shadow: 0 5px 15px red;
`;
const Cover = styled.View`
  width: 100%;
  height: 200px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;
const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 24px;
  margin-top: 20px;
  margin-left: 20px;
  width: 170px;
`;
const Content = styled.View`
  padding-left: 20px;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;
const Wrapper = styled.View`
  margin-left: 10px;
`;
const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;
const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 15px;
  font-weight: 600;
  margin-top: 4px;
  text-transform: uppercase;
`;
