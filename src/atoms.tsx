import { atom, selector } from "recoil";

export interface ITodoState {
  [key: string]: string[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    "TO DO": ["진", "로"],
    DOING: ["틱", "헌", "보"],
    DONE: ["스", "이"],
  },
});
