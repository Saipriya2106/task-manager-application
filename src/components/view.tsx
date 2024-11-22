import {useNavigate } from "react-router-dom";
import { useParams} from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { RingLoader } from 'react-spinners';
import { TaskContext } from "../context/context";
import './view.css';
type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

export const View: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const idNumber:Number = parseInt(id || '0', 10); 
    const navigate = useNavigate();
    const {tasks} = useContext(TaskContext);
    
    const [selectedTask, setSelectedTask] = useState<TaskDetails | null>(null); 
    const [loading,setLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); 
        }, 1000); 
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const task : TaskDetails | undefined= tasks.find(task =>task.id === idNumber);
        if(task){
            setSelectedTask(task);
        }
        
    }, [id]); 

    if (!selectedTask) {
        return <p className="no-tasks-message">No tasks found..</p>;
    }

    return (
        loading ? (
            <div className="spinner-container">
                <RingLoader color="#33395c" loading={loading} size={50} />
            </div>
        ) : (
        
        <div className='viewtask'>
            <div className="edit-buttons">
                <button onClick={()=>navigate(`/edit/${id}`)} className="edit-button">Edit</button>
            </div> 
            <h3 className="task-title"> <b>Title:</b> {selectedTask.title}</h3>
            <p className="task-description"> <b>Description:</b> {selectedTask.description}</p>
            <p className="task-due-date"> <b>Due Date:</b> <span className='blink'>{selectedTask.dueDate}</span> </p>
            <p className="task-status"> <b>Status:</b> {selectedTask.status}</p>
            <div className="buttons">
                <button onClick={() => navigate('/')} className="button">Back</button>
            </div> 
           
        </div>
        )
    );
}
