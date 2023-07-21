import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";
import Trashcan from "./Components/Trashcan";

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
    const { destination, source } = info;

    if (!destination) return;

    if (destination?.droppableId === "trashcan") {
      // remove item
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        sourceCopy.splice(source.index, 1);

        return {
          ...allBoards,
          [source.droppableId]: sourceCopy,
        };
      });
    }

    if (destination?.droppableId === source.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const copy = [...allBoards[source.droppableId]];
        const taskObj = copy[source.index];
        copy.splice(source.index, 1);
        copy.splice(destination?.index, 0, taskObj);

        return { ...toDos, [source.droppableId]: copy };
      });
    }

    if (
      destination?.droppableId !== source.droppableId &&
      !(destination?.droppableId === "trashcan")
    ) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceCopy[source.index];
        const destinationCopy = [...allBoards[destination.droppableId]];
        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination.index, 0, taskObj);

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
            <Trashcan />
          </Boards>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}
