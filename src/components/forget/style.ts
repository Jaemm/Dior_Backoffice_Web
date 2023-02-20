import styled from 'styled-components';

export const Container = styled.div`
  .exit {
    top: 15px;
    left: 15px;
    position: absolute;
  }
  h3 {
    color: black;
    font-size: 24px;
    font-weight: 400;
    user-select: none;
    text-align: center;
    margin-bottom: 20px;
  }

  form {
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: 100%;
    p.info {
      color: black;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
    }
  }
`;

export const ForgetButton = styled.div`
  font-size: 18px;
  cursor: pointer;
  font-weight: 600;
  width: fit-content;
  margin: 30px 0 0;
  color: var(--gray);
  user-select: none;
  border-bottom: 1px solid var(--gray);
`;
