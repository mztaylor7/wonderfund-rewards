import styled from 'styled-components';

export default styled.h3`
  font-size: 2.1rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
  font-weight: 400;
  line-height: 1.4;
  margin: 4rem 0;
`;
