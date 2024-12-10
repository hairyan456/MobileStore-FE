import { Input } from "antd";
import styled from "styled-components";

// Wrapper for InputForm
export const WrapperStyleInputForm = styled(Input)`
    border-top: none;
    border-right: none;
    border-left: none;
    border-radius: 0;
    outline: none;
    &:focus{
        background-color: rgb(232,240,254);
    }
`;

