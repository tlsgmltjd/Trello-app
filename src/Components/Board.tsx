import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  padding: 30px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId="one">
      {(provider) => (
        <Wrapper ref={provider.innerRef} {...provider.droppableProps}>
          {toDos.map((toDo, index) => (
            <DragabbleCard key={toDo} toDo={toDo} index={index} />
          ))}
          {provider.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}
