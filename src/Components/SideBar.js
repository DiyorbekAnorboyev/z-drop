import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setBoolean } from "../Slices/Bool/boolSlice";

function SideBar() {
  const dispatch = useDispatch();
  return (
    <Container>
      <Wrapper>
        <NewChannel onClick={() => dispatch(setBoolean({ modelBools: true }))}>
          <span onClick={() => dispatch(setBoolean({ modelBools: true }))}>
            New
          </span>
        </NewChannel>
      </Wrapper>
    </Container>
  );
}

export default SideBar;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NewChannel = styled.div`
  width: 118px;
  height: 48px;
  background-color: white;
  border-radius: 24px;
  padding: 2px;
  cursor: pointer;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 01);
  transition: all 200ms ease-out;

  &:hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;