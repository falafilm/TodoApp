import { useEffect, useState} from "react"; 
import CreateTask from "../modals/createTask";
import Card from "./Card";


const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect (() => {
        let arr = localStorage.getItem("taskList")
        
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, []) //ให้แสดง task ที่เพิ่มอยู่หน้าเว็บไม่หาย

    const incompleteTasks = taskList.filter(
        (task) => localStorage.getItem(`task-checked-${task.Title}`) !== 'true'
      ).length;

    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
        
    }

    const updateList = (obj, index) => {
        let tempList = [...taskList];
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
        
    }

    const toggle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        let tempList = [...taskList]
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        setModal(false)
        window.location.reload()
       
    }
    return(
        <>
            <div className="header">
                <h3 className="textTodo">To-Do-List</h3>
                <button className="add-task" onClick={() => setModal(true)}>Add Task</button>
             </div>

             <div className="my-task">
                <p>My Tasks</p>
            </div>
            <div className="count-task">
                <p>You have {incompleteTasks} tasks left!</p>
            </div>

             <div className="task-container">
                {taskList.map((obj, index) => <Card taskObj={obj} index={index}
                deleteTask={deleteTask} updateList={updateList} />)}
             </div>

             <CreateTask toggle={toggle}  modal={modal} save={saveTask} />
        
        </>
    )
}


export default TodoList;
