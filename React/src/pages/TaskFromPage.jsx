import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import {toast} from 'react-hot-toast'

export function TaskFromPage() {
    const {
        register, 
        handleSubmit,
         formState: { errors },
         setValue
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();
    
    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
           await updateTask(params.id, data);
           toast.success('Tarea Actualizada',{
            position: "bottom-right",
            style: {
                background: "#101010",
                color: "#fff"
            }
        })
        } else {
            await CreateTask(data);
            toast.success('Tarea Creada',{
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })
        }
        navigate ("/tasks");
    });

    useEffect(() => {
        async function loasTask() {
            if (params.id) {
                const {data:{title ,description}} = await getTask(params.id);
                setValue ('title', title)
                setValue ('description',description)
            }
        }
        loasTask();

    }, []);


    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="title" {...register("title", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'/>
                {errors.title && <span>Title required</span>}
                <textarea rows="3" placeholder="Description" {...register("description", { required: true })} className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'></textarea>
                {errors.description && <span>Description required</span>}
                
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>Save</button>
            </form>
            
            {params.id && 
                <button className='bg-red-500 p-3 rounded-lg w-48 mt-3' onClick={async () => {
                    const accepted = window.confirm('Estas seguro?');
                    if (accepted) {
                        await deleteTask(params.id);
                        toast.success('Tarea Eliminada',{
                            position: "bottom-right",
                            style: {
                                background: "#101010",
                                color: "#fff"
                            }
                        })
                        navigate("/tasks");
                    }
                }}
                >
                    Delete
                </button>
            }


        </div>
    );
}
