import styled from 'styled-components';

export default styled.div`
  height: 7.2rem;
  width: 7.2rem;
  position: absolute;
  cursor: pointer;
  top: -3.4rem;
  left: 0;
  right: 0;
  margin: 0 auto;

  & img {
    height: 7.2rem;
    width: 7.2rem;
    border-radius: 100%;
    background-size: cover;
    z-index: 1;
  }
`;
