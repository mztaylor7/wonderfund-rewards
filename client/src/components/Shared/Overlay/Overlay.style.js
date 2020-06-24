import styled from 'styled-components';

export default styled.div`
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

  &:hover {
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
