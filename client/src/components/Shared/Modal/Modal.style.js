import styled from 'styled-components';

export const Fader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;

  & span {
    display: inline;
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 12vh;
    text-align: center;
  }

  & span u {
    cursor: pointer;
    color: #656969;
    &:hover {
      color: #28282b;
    }
  }
`;

export const InfoCard = styled.div`
  width: 40vw;
  max-height: 70vh;
  box-shadow: 0 0 4px 0 rgba(168, 167, 164, 0.4);
  padding: 2.4rem;
  overflow-y: auto;
  color: #282828;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;

  & p:first-of-type {
    font-size: 18px;
    text-align: center;
    margin: 0 auto 60px;
  }

  & h2 {
    font-size: 2.4rem;
  }

  & p:last-of-type {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 30px;
  }
`;
