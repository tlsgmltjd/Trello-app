import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

interface IDragabblCardProps {
  toDo: string;
  index: number;
}

export default function DragabblCard({ toDo, index }: IDragabblCardProps) {
  console.log(toDo, "has been rendered");
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
