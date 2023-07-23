import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ITodoState, toDoState } from "./atoms";
import Board from "./Components/Board";
import Trashcan from "./Components/Trashcan";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const Container = styled.div`
  background: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

const AddForm = styled.form`
  margin: 20px;
  background-color: rgb(218, 223, 233);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 10px;

  transition: scale 0.3s;

  &:hover {
    scale: 1.1;
    transition: scale 0.3s;
  }
`;

const AddInput = styled.input`
  outline: none;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  text-align: center;
  border-radius: 10px;
  width: 150px;
  font-size: 10px;
  height: 10px;
`;

export default function App() {
  const [toDos, setToDos] = useRecoilState<ITodoState>(toDoState);

  const { register, setValue, handleSubmit, getValues } = useForm();

  const onSubmit = ({ addBoard = "" }: { addBoard?: string }) => {
    if (Object.keys(toDos).includes(addBoard)) {
      alert("동일한 이름의 보드가 존재합니다!");
      return;
    }
    setToDos((preToDos) => {
      return {
        ...preToDos,
        [addBoard]: [],
      };
    });

    setValue("addBoard", "");
  };

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

  useEffect(() => {
    const copyToDos = { ...toDos };
    Object.keys(copyToDos).map((i) => {
      if (!toDos[i]) {
        localStorage.setItem(i, JSON.stringify(toDos[i]));
      } else {
        setToDos((pre) => {
          const getToDo = JSON.parse(localStorage.getItem(i));
          console.log(i);
          return {
            ...pre,
            [i]: [...getToDo],
          };
        });
      }
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Wrapper>
          <AddForm onSubmit={handleSubmit(onSubmit)}>
            <AddInput
              {...register("addBoard", { required: true })}
              placeholder="추가할 보드의 이름을 적어주세요!"
            />
          </AddForm>
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
