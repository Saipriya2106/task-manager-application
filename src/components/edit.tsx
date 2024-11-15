import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/context";
import './edit.css'

type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};

type TaskErrors = {
    title: string;
    description: string;
    dueDate: string;
};

export const Edit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const taskId = id ? parseInt(id) : 0;
    const [isModified, setIsModified] = useState<boolean>(false);
    const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
    const [taskErrors, setTaskErrors] = useState<TaskErrors>({ title: "", description: "", dueDate: "" });
    const {tasks,add} = useContext(TaskContext);

    useEffect(() => {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            setTaskDetails(task);
        } else {
            navigate('/'); 
        }
    }, [taskId, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIsModified(true);

        setTaskErrors(prevState => ({
            ...prevState,
            [name]: value === "" ? `${name} is required` : "",
        }));
        setTaskDetails(prevState => ({
            ...prevState!,
            [name]: value,
        }));
    };

    const handleFocus = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const { name, value } = e.target;
        setTaskErrors(prevState => ({
            ...prevState,
            [name]: value === "" ? `${name} is required` : "",
        }));
        setTaskDetails(prevState => ({
            ...prevState!,
            [name]: value,
        }));
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskDetails) {
            // const tasks: TaskDetails[] = JSON.parse(localStorage.getItem('tasks') || '[]');
            const updatedTasks = tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, ...taskDetails };
                }
                return task;
            });
            // localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            // setTasks(updatedTasks);

            add(updatedTasks);
            alert("Task Edited Successfully");
            navigate(`/view/${taskId}`)
        }
    };
    

    if (!taskDetails) return null; 
    
    

    return (
        <div className="edit-task">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <label className="labels">Title:</label>
                <input type="text" name="title" value={taskDetails.title} onChange={handleChange} required />
                <p className="error">{taskErrors.title}</p>

                <label className="labels">Description:</label>
                <textarea name="description" value={taskDetails.description} onChange={handleChange} required />
                <p className="error">{taskErrors.description}</p>

                {/* <label className="datelabel">Due Date:</label>
                <input type="date" name="dueDate" value={taskDetails.dueDate} onChange={handleChange} required />
                <p className="error">{taskErrors.dueDate}</p> */}

                <label className="labels">Status:</label>
                <select onChange={handleChange} value={taskDetails.status} name='status' className="status-dropdown">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <label className="datelabel">Due Date:</label>
                <input type="date" name="dueDate" value={taskDetails.dueDate} onChange={handleChange} onFocus={handleFocus} required />
                <p className="error">{taskErrors.dueDate}</p>
                <div className="buttons">
                <button disabled={!isModified} type="submit" className="Editbtn" >Submit</button>
                <button onClick={() => navigate(`/view/${id}`)} className="backbtn" >Back</button>
                </div>
            </form>
        </div>
    );
}
