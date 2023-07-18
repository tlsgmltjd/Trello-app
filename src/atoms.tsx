import { atom, selector } from "recoil";

interface ITodoState {
  [key: string]: string[];
}

export const toDoState = atom<ITodoState>({
  key: "toDo",
  default: {
    to_do: ["a", "g"],
    doing: ["b", "c", "d"],
    done: ["e", "f"],
  },
});
