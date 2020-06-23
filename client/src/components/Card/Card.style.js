import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: ${(props) => props.theme.colors.highlightGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;

  & p {
    font-size: 1.8rem;
    color: #ffffff;
  }
`;

export const Container = styled.div`
  width: 10%;
  border: 1px solid ${(props) => props.theme.colors.borderGrey};
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover ${Overlay} {
    opacity: 0.9;

    & p {
      animation-name: focus-in-contract;
      animation-duration: 0.3s;
      animation-timing-function: ease;
      animation-delay: 0s;
      animation-iteration-count: 1;
      animation-direction: normal;
      animation-fill-mode: none;
    }
  }

  @keyframes focus-in-contract {
    0% {
      letter-spacing: 1em;
      filter: blur(6px);
      opacity: 0;
    }
    100% {
      filter: blur(0);
      opacity: 1;
    }
  }
`;

export const SplitContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  margin-top: 20px;
  margin-bottom: ${(props) => (props.activated ? '20px' : '0')};
`;

export const DescriptionContainer = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  position: relative;
  height: ${(props) => {
    if (props.activated) {
      return props.open ? 'auto' : '40px';
    }

    return 'auto';
  }};
  color: ${(props) => props.theme.colors.flavorText};
  display: grid;
  grid-template-rows: ${(props) => (props.activated ? '1fr 20px;' : '1fr')};
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
  width: 80px;
  text-align: end;
  cursor: pointer;
  position: absolute;
  right: 5px;
  bottom: 0;
`;

export const RewardList = styled.ul`
  list-style: disc;
  padding-left: 1.2rem;
  margin-left: 1.8rem;
  margin-bottom: 20px;
`;
