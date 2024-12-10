import { Col } from "antd";
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px 120px;
  width: 100%;
  background: #efefef
`;

// Styled left section
export const LeftSection = styled(Col)`
  height:fit-content;
  background: #ffffff;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;

// Styled right section
export const RightSection = styled(Col)`
  background: #ffffff;
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;

  &:last-child {
    font-weight: bold;
    font-size: 18px;
  }
`;