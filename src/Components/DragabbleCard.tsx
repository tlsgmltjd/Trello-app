import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background: ${(props) =>
    props.isDragging ? "#81ecec" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "2px 4px 20px rgba(0,0,0,0.2)" : "none"};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
`;

interface IDragabblCardProps {
  toDo: string;
  index: number;
}

function DragabblCard({ toDo, index }: IDragabblCardProps) {
  return (
    <Draggable key={toDo} draggableId={toDo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// React.memo
// props 가 변하지 않으면 렌더링 하지 마세용
export default React.memo(DragabblCard);
