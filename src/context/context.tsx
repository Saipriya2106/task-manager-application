import { createContext } from "react";

type TaskDetails = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;
};
type TaskContextType = {
  tasks: TaskDetails[];
  setTasks: React.Dispatch<React.SetStateAction<TaskDetails[]>>; 
  add:(updatedtasks: TaskDetails[]) => void
  // delete:(updatedtasks: TaskDetails) => void
}
export const TaskContext = createContext<TaskContextType>({
    tasks: [],
    setTasks:() => {},
    add:()=>{}

});
