import { atom, selector } from "recoil";

export interface ITodoState {
  [key: string]: string[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    TO_DO: ["a", "g"],
    DOING: ["b", "c", "d"],
    DONE: ["e", "f"],
  },
});
