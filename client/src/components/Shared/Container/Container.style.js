import styled from 'styled-components';

export default styled.div`
  width: 10%;
  border: 1px solid ${(props) => props.theme.colors.borderGrey};
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  transition: all 0.2s ease-in-out;
  position: relative;
`;
