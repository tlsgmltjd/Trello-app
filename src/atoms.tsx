import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

export interface ITodoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    "TO DO": [],
    DOING: [],
    DONE: [],
  },
});
