import styled from 'styled-components';

export default styled.h3`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
  font-weight: 400;
  line-height: 1.4;
  margin-top: 20px;
  margin-bottom: 10px;
`;
