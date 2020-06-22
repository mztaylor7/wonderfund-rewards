import styled from 'styled-components';

export const Container = styled.div`
  width: 10%;
  border: 1px solid ${(props) => props.theme.colors.borderGrey};
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
`;

export const Heading = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.text};
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 5px;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
  font-weight: 400;
  line-height: 1.4;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const SmallTitle = styled.h3`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.text};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
  font-weight: 400;
  line-height: 1.4;
`;

export const SubHeading = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  color: ${(props) => props.theme.colors.flavorText};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'capitalize')};
`;

export const BackerHeading = styled.p`
  color: ${(props) => props.theme.colors.flavorText};
  text-transform: ${(props) => (props.uppercase ? 'uppercase' : 'lowercase')};
  margin: 20px 0;
`;

export const DescriptionContainer = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  position: relative;
  height: ${(props) => (props.open ? 'auto' : '40px')};
  color: ${(props) => props.theme.colors.flavorText};
  display: grid;
  grid-template-rows: 1fr 20px;
  overflow: hidden;
  margin-bottom: ${(props) => (props.open ? '1rem' : '20px')};
`;

export const DescCollapseBtn = styled.p`
  color: ${(props) => props.theme.colors.text};
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 20%
  );
  width: 100px;
  text-align: end;
  cursor: pointer;
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
