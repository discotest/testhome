import styled from 'styled-components';

const BackgroundImage = styled.div`
  border-radius: ${(props) => `${props.borderRadius}px` || '0px'};
  background: url(${(props) => props.src}) no-repeat center;
  background-size: cover;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  cursor: ${(props) => `${props.cursor} || auto`};
`;

export default BackgroundImage;
