import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.theme.cardColor};
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
  );
}

// React.memo
// props 가 변하지 않으면 렌더링 하지 마세용
export default React.memo(DragabblCard);
