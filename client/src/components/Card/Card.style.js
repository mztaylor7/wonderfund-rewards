import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.borderGrey};
  display: flex;
  flex-direction: column;
`;

export const Heading = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium};
  font-weight: 400;
  line-height: 1.4;
`;
