import { Link, useNavigate} from "react-router-dom";
import './task.css';
import React, { useContext } from "react";
import { TaskContext } from "../context/context";

type LayoutProps = {
    search: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filterchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleStartDateChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleEndDateChange:(event: React.ChangeEvent<HTMLSelectElement>) => void;
};
type TaskProps = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};
export function Layout({ search, filterchange , handleStartDateChange,handleEndDateChange}: LayoutProps) {
    return (
        <>
            <div className="topnav">
                <div className="left-container">
                    <Link to="/" className="active">Tasks</Link>
                    <Link to="/create" className="active">Create Task</Link>
                </div>
                <div className="right-container">
                    <div className="dropdown">
                        <select onChange={filterchange}>
                            <option value="all">All Tasks</option>
                            <option value="upcoming">Upcoming Tasks</option>
                            <option value="overdue">Overdue Tasks</option>
                        </select>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search.." onChange={search} />
                    </div>
                </div>
            </div>
        </>
    );
}


type TaskListProps = {
    tasks: TaskProps[];
};
type DeleteTaskProps = {
    id: number;
};

const DeleteTask: React.FC<DeleteTaskProps> = ({ id }) => {
    const navigate = useNavigate();
    const { add, tasks } = React.useContext(TaskContext);

    const handleDelete = () => {
        const confirmDelete = confirm("Are you sure?");
        if (confirmDelete) {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            add(updatedTasks); 
            alert("Task deleted successfully!");
            navigate("/");
        }
    };

    return (
        <button onClick={handleDelete} className="delete-task">
            Delete
        </button>
    );
};

export const TaskList: React.FC<TaskListProps>=({ tasks })=> {
    const navigate = useNavigate();
    return (
        <div className="task-list-container1">
            <table className="table1">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="task-list-container2">
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                           
                            <tr className="task-row1" key={task.id} onClick={()=> navigate(`/view/${task.id}`)}>
                                <td className="task-title1">{task.title}</td>
                                <td className="task-description1">{task.description}</td>
                                <td className="task-due-date1">{task.dueDate}</td>
                                <td className="task-status1">{task.status}</td>
                                <td className="task-actions1"  onClick={(e) => e.stopPropagation()}>
                                <DeleteTask id={task.id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="no-tasks-message1">No tasks found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
