import { useState, useEffect } from 'react';

type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};

// const initialTasks: TaskDetails[] = 
// [
//     {
//       "id": 1,
//       "title": "Complete React Project",
//       "description": "Finish building the React application for task management, including views for task creation, editing, and deletion.",
//       "dueDate": "2024-11-20",
//       "status": "In Progress"
//     },
//     {
//       "id": 2,
//       "title": "Write Unit Tests",
//       "description": "Write unit tests for the task management features to ensure everything works correctly.",
//       "dueDate": "2024-11-15",
//       "status": "Pending"
//     },
//     {
//       "id": 3,
//       "title": "Refactor Code",
//       "description": "Refactor the task management app to improve code readability and performance.",
//       "dueDate": "2024-11-18",
//       "status": "In Progress"
//     },
//     {
//       "id": 4,
//       "title": "Design Task UI",
//       "description": "Create the design for the user interface of the task management app, including the task list, form, and buttons.",
//       "dueDate": "2024-11-12",
//       "status": "Completed"
//     },
//     {
//       "id": 5,
//       "title": "Fix Bugs in Task Form",
//       "description": "Fix issues with the task form not properly submitting data or saving task information.",
//       "dueDate": "2024-11-14",
//       "status": "Pending"
//     },
//     {
//       "id": 6,
//       "title": "Deploy to Production",
//       "description": "Deploy the task management application to the production server after testing and final bug fixes.",
//       "dueDate": "2024-11-25",
//       "status": "Pending"
//     }
//   ]
  
export function useFetchTasks(): [TaskDetails[], React.Dispatch<React.SetStateAction<TaskDetails[]>>] {
  const [Tasks, setTasks] = useState<TaskDetails[]>([]);
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []); 


  return [Tasks, setTasks];
}



// function useFetchTasks() {
//   const [tasks, setTasks] = useState<TaskDetails[]>(() => {
//     const storedTasks = localStorage.getItem('tasks');
//     return storedTasks ? JSON.parse(storedTasks) : []; 
//   });

//   useEffect(() => {
//     if (tasks.length > 0) {
//       localStorage.setItem('tasks', JSON.stringify(tasks)); 
//     }
//   }, [tasks]); 

//   return [tasks];
// }

// export default useFetchTasks;


// export const useFetchTasks = async () => {
//   const [result, setResult] = useState<string>("rendering");
//   const [data, setDate] = useState<Posts[]>([]);
//   async function getdetails() {
//       const respose = await fetch("https://gorest.co.in/public/v2/posts");
//       if (respose.ok) {
//           const details = await respose.json();
//           setDate(details);
//           setResult("success");
//       }
//       else {
//           setResult("failure");
//       }
//   }
//   useEffect(() => {
//       getdetails();
//   }, [])

//   return { result, data };
// }



// const useFetchTasks = async(url:string,method:string,body) =>{
//     const [result, setResult] = useState<string>("rendering");
//     const [data, setDate] = useState([]);
//     async function getdetails(){
//          if(method == "get" || method == "delete"){
//                 const respose = await fetch(url,{
//                     method: method,
//                     headers: {
//                         'content-type': 'application/json',
//                         accept: 'application/json',
//                         authorization: 'Bearer token',
//                     },
//             }
//             );
//             if(respose.ok){
//                 const details = await respose.json();
//                 setDate(details);
//                 setResult("success");
//             }
//             else{
//                 setResult("failure");
//             }
//          }
//             else{
//                 const respose = await fetch(url,{
//                     method: method,
//                     headers: {
//                         'content-type': 'application/json',
//                         accept: 'application/json',
//                         authorization: 'Bearer token',
//                     },
//                     body:body
//             }
//             );
//             if(respose.ok){
//                 const details = await respose.json();
//                 setDate(details);
//                 setResult("success");
//             }
//             else{
//                 setResult("failure");
//             }
//             }
//     }
//     useEffect(()=>{
//         getdetails();
//     },[url,method])

//     return {result,data};
// }