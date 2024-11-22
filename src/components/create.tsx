import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/context';
import './create.css';
type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};


export const Create:React.FC = ()=> {
    const navigate = useNavigate();
    const {tasks, add} = useContext(TaskContext);
    const [isModified, setIsModified] = useState<boolean>(false);
    const [taskDetails, setTaskDetails] = useState<Partial<TaskDetails>>({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending"
    });
    
    const [taskErrors, setTaskErrors] = useState({
        title: "",
        description: "",
        dueDate: "",
    });
    const validateField = (name: string, value: string) => {
        let error = "";
    
        switch (name) {
            case "title":
                if (value.trim() === "") {
                    error = "Title is required.";
                } else if (value.length < 5) {
                    error = "Title must be at least 5 characters.";
                }
                break;
    
            case "description":
                if (value.trim() === "") {
                    error = "Description is required.";
                } else if (value.length < 10) {
                    error = "Description must be at least 10 characters.";
                } else if (value.length > 100) {
                    error = "Description must be less than 100 characters.";
                }
                break;
    
            case "dueDate":
                if (value === "") {
                    error = "Due Date is required.";
                } else {
                    const today = new Date();
                    const selectedDate = new Date(value);
                    if (selectedDate < today) {
                        error = "Due Date must be in the future.";
                    }
                }
                break;
    
            default:
                break;
        }
        setTaskErrors((prevState) => ({
            ...prevState,
            [name]: error,
        }));
    };
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIsModified(true);
        const { name, value } = e.target;
        // setTaskErrors(prevState => ({
        //     ...prevState,
        //     [name]: value === "" ? `${name} is required` : "",
        // }));
        validateField(name,value);
        setTaskDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTaskErrors(prevState => ({
            ...prevState,
            [name]: value === "" ? `${name} is required` : "",
        }));
        setTaskDetails(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTask: TaskDetails = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title: taskDetails.title as string,
            description: taskDetails.description as string,
            dueDate: taskDetails.dueDate as string,
            status: taskDetails.status as string,
        };

        const updatedTasks = [...tasks, newTask];
        // localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        // setTasks(updatedTasks);

        add(updatedTasks);

        setTaskDetails({
            title: "",
            description: "",
            dueDate: "",
            status: "Pending"
        });
        alert("Task Created Successfully!");
        navigate('/');
    };

    return (
        <div className="create-task">
            <h2>Create Task</h2>
            <form onSubmit={handleSubmit}>
                <label className="labels">Title:</label>
                <input type="text" name="title" value={taskDetails.title} onChange={handleChange} onFocus={handleFocus} required />
                <p className="error">{taskErrors.title}</p>

                <label className="labels">Description:</label>
                <textarea name="description" value={taskDetails.description} onChange={handleChange} onFocus={handleFocus} required/>
                <p className="error">{taskErrors.description}</p>

                <label className="datelabel">Due Date:</label>
                <input type="date"name="dueDate"value={taskDetails.dueDate} onChange={handleChange} onFocus={handleFocus} required />
                <p className="error">{taskErrors.dueDate}</p>
                <div className='createbtn'>
                    <button type="submit" disabled = {!isModified} className='btn' >Create Task</button>
                </div>
            </form>
        </div>
    );
}
