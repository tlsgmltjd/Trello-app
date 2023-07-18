import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 0 20px;
  padding-top: 30px;
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

export default function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {(provider) => (
                <Board ref={provider.innerRef} {...provider.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <Draggable draggableId={toDo} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          {toDo}
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provider.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </Container>
    </DragDropContext>
  );
}
