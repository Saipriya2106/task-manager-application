import { useState, useEffect } from 'react';

type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};
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