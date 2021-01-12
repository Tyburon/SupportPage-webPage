import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #e4f9ff;
`;

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

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #fafafa;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 16px;
      background: #fafafa;
      margin: 0 8px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #e3f9ff; // cabeçalho
    border-radius: 10px;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px 0 0 0;
    padding: 16px;
    background-color: #f8f9ff; //fundo
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1em;
    padding: 0 1em;
    color: #0a122a;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #e3f9ff; //marcador do dia available
    border-radius: 10px;
    color: #0a122a; // provavlemente texto do diaavailable
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.1, '#e3f9ff')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #d6e1ff !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #fafafa;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #f0f4ff;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background: #94d2ff;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #0a122a;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #0a122a;

      svg {
        color: #878eff;
        margin-right: 8px;
      }
    }
  }
`;

export const CurrentAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #fafafa;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #f0f4ff;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background: #878eff;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #0a122a;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #0a122a;

      svg {
        color: #878eff;
        margin-right: 8px;
      }
    }

    button {
      display: flex;
      align-items: center;
      flex-direction: row;
      margin-left: auto;
      background: transparent;
      border: 0;
      text-align: center;

      svg {
        margin-top: 4px;
        color: #878eff;
        width: 20px;
        height: 20px;
      }
    }
  }
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

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #fafafa;
    width: 70px;

    svg {
      color: #fafafa;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #f0f4ff;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #0a122a;
      font-size: 20px;
    }
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

export const InsideCard = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Report = styled.div``;

export const CardsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex: 1;
  flex-direction: column;

  div {
    margin: auto;
  }

  div + div {
    margin-top: 16px;
  }
`;
