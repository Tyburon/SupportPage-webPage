import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #e4f9ff;
`;

export const Report = styled.div``;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #878eff;
      width: 20px;
      height: 20px;
    }
  }

  li {
    display: flex;
    align-items: center;
  }
  li + li::before {
    content: '';
    width: 2px;
    height: 16px;
    background: #0028f9;
    margin: 0 8px;
  }
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
`;

export const MenuListItem = styled.li`
  color: #000;
  margin-left: 60px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
  }
  & + li {
    margin-left: 4px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #312e38;
  }

  strong {
    color: #878eff;
  }

  a {
    text-decoration: none;
    color: #878eff;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;


export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #fafafa;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #fafafa;
  }
`;

export const StartSchedule = styled.div`
  button {
    width: 300px;
    height: 58px;
    background: #f0f4ff;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    margin-top: 24px;
    border: 0px;
  }

  strong {
    margin-left: 24px;
    color: #0a122a;
    font-size: 20px;
  }
`;

export const FormContent = styled.div`
  width: 650px;
  border-radius: 20px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;

  strong {
    margin-left: 24px;
    color: #0a122a;
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;

  div {
    margin: auto;
  }
`;
