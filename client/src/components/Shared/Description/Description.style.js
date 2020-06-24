import styled from 'styled-components';

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
