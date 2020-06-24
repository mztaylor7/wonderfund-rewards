import styled from 'styled-components';

export default styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.flavorText};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
`;
