import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 10px;
  min-width: 20px;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  border-radius: 15px;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
`;

const Area = styled.div`
  padding: 20px;
`;

export default function Trashcan() {
  return (
    <Wrapper>
      <Droppable droppableId="trashcan">
        {(provider) => (
          <Area ref={provider.innerRef} {...provider.droppableProps}>
            {provider.placeholder}
            🗑
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
