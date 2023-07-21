import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 250px;
  display: flex;
  flex-direction: column;
`;

const BoardTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IAreaProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IFrom {
  toDo: string;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#ffeaa7"
      : props.isDraggingFromThis
      ? "#ff7675"
      : "#dfe6e9"};

  padding: 20px;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;

  input {
    border: none;
    border-radius: 8px;
    text-align: center;
    padding: 5px;
    font-weight: 600;
    font-size: 13px;
    background: rgba(0, 0, 0, 0);
    border-bottom: 1px solid;
    outline: none;
  }
`;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

export default function Board({ toDos, boardId }: IBoardProps) {
  const setToDo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IFrom>();
  const onValid = ({ toDo }: IFrom) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDo((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <BoardTitle>{boardId}</BoardTitle>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provider, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provider.innerRef}
            {...provider.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {provider.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}
