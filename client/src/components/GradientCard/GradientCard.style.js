import styled from 'styled-components';

export default styled.div`
  margin-top: 10px;
  padding: 1.8rem;
  width: 100%;
  height: auto;
  background: linear-gradient(to bottom, #dbe7ff, #fff2ec);
  border: 1px solid #dbe7ff;
  display: flex;
  flex-direction: column;
  align-items: center;

  & span,
  p {
    margin-bottom: 1.2rem;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  & span {
    font-weight: 800;
    color: #222222;
  }
`;
