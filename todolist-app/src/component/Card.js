import React, {useState, useEffect} from 'react';
import EditTask from '../modals/EditTask'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Card = ({taskObj, index, deleteTask, updateList}) => {
    const [modal, setModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false)

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    const storageKey = `task-checked-${taskObj.Title}`; 

    useEffect(() => {
        const stored = localStorage.getItem(storageKey);
        if (stored === 'true') {
            setChecked(true);
        }
    }, [storageKey]);

    useEffect(() => {
        localStorage.setItem(storageKey, checked);
    }, [checked]);

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateList(obj, index);
    }

    const toggleDeleteModal = () => {
        setConfirmDelete(!confirmDelete);
    }

    const handleDelete = () => {
        localStorage.removeItem(storageKey);
        deleteTask(index);
        setConfirmDelete(false);
    }

    const handleCheckboxChange = () => {
        setChecked(!checked);
    }

        return (
            <div className="card-wrapper mr-5">
                <div className="card-top" style={{ backgroundColor: colors[index % 5].primaryColor }}></div>
                <div className="task-holder">
                    <div
                        className="card-header d-flex align-items-center"
                        style={{
                            backgroundColor: colors[index % 5].secondaryColor,
                            borderRadius: "10px",
                            padding: "5px 10px"
                        }}
                    >
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={checked}
                            onChange={handleCheckboxChange}
                            style={{ marginRight: "10px" }}
                        />
                        <span style={{
                            textDecoration: checked ? "line-through" : "none",
                            fontWeight: "bold"
                        }}>
                            {taskObj.Title}
                        </span>
                        
                    </div>
    
                    <p className="mt-3">{taskObj.Description}</p>

                    {taskObj.Date && (
                            <p style={{ fontSize: "0.9rem", color: "red", marginTop: "10px" }}>
                                Due: {new Date(taskObj.Date).toLocaleDateString("th-TH", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric"
                                    
                                })}
                            </p>
                        )}
    
                    <div style={{ position: "absolute", right: "30px", bottom: "20px" }}>
                        <i className="far fa-edit mr-3"
                            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
                            onClick={() => setModal(true)}></i>
                        <i className="fas fa-trash-alt"
                            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
                            onClick={toggleDeleteModal}></i>
                    </div>
                </div>
                <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />

                <Modal isOpen={confirmDelete} toggle={toggleDeleteModal}>
                    <ModalHeader toggle={toggleDeleteModal}>Are you sure? </ModalHeader>
                        <ModalBody>   
                        Do you want delete item?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
                            <Button color="danger" onClick={handleDelete}>Delete</Button>
                        </ModalFooter>
                </Modal>
            </div>
        );
    };
  
export default Card;