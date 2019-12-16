import React from 'react'
import styled from 'styled-components';
const Logo = props => {
  const { image, text } = props
  return (
    <Container>
      <Image source={image} resizeMode="contain" />
      <Text>{text}</Text>
    </Container>
  )
}

const Container = styled.View`
  padding: 8px 16px 12px;
  height: 60px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  align-items: center;
  margin: 0 8px;
`;
const Image = styled.Image`
  width:36px;
  height:36px;
`
const Text = styled.Text`
  font-weight:600;
  font-size:17px;
  margin-left:8px;
`
export default Logo;