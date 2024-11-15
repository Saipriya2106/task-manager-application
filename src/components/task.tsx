import { Link, useNavigate} from "react-router-dom";
import './task.css';

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
export function Task({ id, title, description, dueDate, status }: TaskProps) {
    return (
        <Link to={`/view/${id}`} className="task-link">
   
            <div className="task">
                {/* <div className="task-header" >
                    <Link to={`/view/${id}`} className="view-button">View</Link>
                </div> */}
                <h3 className="task-title">{title}</h3>
                <p className="task-description"><strong>Description:</strong> {description}</p>
                <p className="task-due-date"><strong>Due Date:</strong> {dueDate}</p>
                <p className="task-status"><strong>Status:</strong> {status}</p>
            </div>
        </Link>
    );
}


type TaskListProps = {
    tasks: TaskProps[];
};

export function TaskList({ tasks }: TaskListProps) {
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
                        {/* <th>Actions</th> */}
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
                                {/* <td className="task-actions1">
                                    <Link to={`/view/${task.id}`} className="view-button">View</Link>
                                </td> */}
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
