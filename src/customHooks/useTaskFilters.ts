type TaskDetails = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: string;
};
export function useTaskFilters(  tasks: TaskDetails[], filterValue: string, debouncedSearchValue: string, fromDate: string, toDate: string){
    return tasks.filter(todo => {
        const isOverdue = (new Date(todo.dueDate) < new Date() )&& (todo.status!=='Completed');
        const isUpcoming = new Date(todo.dueDate) >= new Date() ;
    
        if (filterValue === 'upcoming') return isUpcoming;
        if (filterValue=== 'overdue') return isOverdue;

        // const taskDueDate = new Date(todo.dueDate);
        // const isWithinDateRange =
        // (fromDate ? taskDueDate >= new Date(fromDate) : true) &&
        // (toDate ? taskDueDate <= new Date(toDate) : true);


        // if (!isWithinDateRange) return false;


        return true; 
      }).filter(todo =>
          todo.title.toLowerCase().includes(debouncedSearchValue.toLowerCase().trim())
      );
}