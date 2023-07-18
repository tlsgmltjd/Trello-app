import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabblCard from "./Components/DragabbleCard";
import Board from "./Components/Board";

const Container = styled.div`
  background: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (destination) {
      setToDos((oldTodos) => {
        const copyToDos = [...oldTodos];
        // 1) Delete item on source.index
        copyToDos.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        copyToDos.splice(Number(destination?.index), 0, draggableId);
        return [...copyToDos];
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
            ))}
          </Boards>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}
