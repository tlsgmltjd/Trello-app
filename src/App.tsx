import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "./atoms";
import Board from "./Components/Board";

const Container = styled.div`
  background: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const copy = [...allBoards[source.droppableId]];
        copy.splice(source.index, 1);
        copy.splice(destination?.index, 0, draggableId);

        return { ...toDos, [source.droppableId]: copy };
      });
    }

    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const destinationCopy = [...allBoards[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
          [destination.droppableId]: destinationCopy,
        };
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
