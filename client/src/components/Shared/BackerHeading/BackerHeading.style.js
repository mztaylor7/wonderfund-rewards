import styled from 'styled-components';

export default styled.p`
  color: ${(props) => props.theme.colors.flavorText};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'lowercase')};
  margin-top: 20px;
  margin-bottom: ${(props) => (props.activated ? '20px' : '0')};
`;
