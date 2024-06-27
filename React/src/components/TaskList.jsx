import { useEffect, useState } from "react"
import { getAllTask } from "../api/tasks.api";
import { TaksCard } from "./TaskCard";

export  function TaksList( ) {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        console.log("entra a la funcion");
        async function loadTasks() {
            console.log("entra a la load");
            const res = await getAllTask();
            setTasks(res.data);
            console.log(res);

        }
        loadTasks();
        console.log("sale a la funcion");
    },[]);

    return <div className="grid grid-cols-3 gap-3">  
            {tasks.map(task => (
              <TaksCard key={task.id} task={task}/>
            ))}
        </div>;
}