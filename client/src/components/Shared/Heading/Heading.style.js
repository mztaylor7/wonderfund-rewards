import styled from 'styled-components';

export default styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 5px;
`;
