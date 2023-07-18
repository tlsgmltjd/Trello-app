import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";

const Wrapper = styled.div`
  padding: 30px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 250px;
`;

const BoardTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
`;

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provider) => (
        <Wrapper ref={provider.innerRef} {...provider.droppableProps}>
          <BoardTitle>{boardId}</BoardTitle>
          {toDos.map((toDo, index) => (
            <DragabbleCard key={toDo} toDo={toDo} index={index} />
          ))}
          {provider.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}
