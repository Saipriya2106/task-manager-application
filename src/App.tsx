import { useState, useEffect } from 'react';
import { Layout, TaskList } from './components/task';
import { View } from './components/view';
import { Create } from './components/create';
import { Edit } from './components/edit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useTaskFilters } from './customHooks/useTaskFilters.ts';
import './App.css';
// import { useFetchTasks } from './customHooks/useFetchTasks.ts';
import { TaskContext } from './context/context.tsx';
import { useFetchTasks } from './customHooks/useFetchTasks.ts';

type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};

const dateformat = (year: number, month: number, day: number): string => {
    const date = new Date(year, month - 1, day);
    return date.toISOString().split('T')[0];
};

  
type debounceType = {
  value:string,
  delay:number
};
function useDebounce({value , delay}:debounceType) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
}

function App() {
    const [tasks, setTasks] = useFetchTasks();
    // const [tasks, setTasks] = useState(initialTasks);

    const add = (updatedtasks:TaskDetails[]) => {
      setTasks(updatedtasks)
      localStorage.setItem('tasks', JSON.stringify(updatedtasks));
    };

    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(initialTasks));
    // }, []);

    const [searchValue, setSearchValue] = useState<string>('');
    const [filterValue, setFilterValue] = useState<string>('');
    const debounceValue = useDebounce({ value: searchValue, delay: 1000 });


    
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(event.target.value);
    };

    const [fromDate, setFromDate] = useState<string>('');
    const [toDate, setToDate] = useState<string>('');
    const handleStartDateChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setFromDate(event.target.value); 
      };
    
      const handleEndDateChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setToDate(event.target.value); 
      };

    const filteredTasks = useTaskFilters(tasks,filterValue,debounceValue,fromDate,toDate).sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateB.getTime() - dateA.getTime(); 
      });


    return (
        <Router>
            <Layout search={handleSearchChange} filterchange={handleFilterChange} handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange}  />
              <TaskContext.Provider value={{tasks,setTasks, add}}>
                <Routes>
                    <Route index element={
                        filteredTasks.length > 0 ? (
                            <TaskList  tasks={filteredTasks} />
                        ) : (
                            <p className="no-tasks-message">No tasks found.</p>
                        )
                    } />
                    <Route path="/view/:id" element={<View />} />
                    <Route path="/edit/:id" element={<Edit/>} /> 
                    <Route path="/create" element={<Create/>} />
                </Routes>
              </TaskContext.Provider>
        </Router>
    );
}

export default App;
