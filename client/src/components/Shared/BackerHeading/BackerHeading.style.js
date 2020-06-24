import styled from 'styled-components';

export default styled.p`
  margin-top: 20px;
  color: ${(props) => props.theme.colors.flavorText};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'lowercase')};
  margin-bottom: ${(props) => (props.activated ? '20px' : '0')};
`;
