import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const [title , setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target

        if(name === "title"){
            setTitle(value)
        }else{
            setDescription(value)
        }
    }

    useEffect(() =>{
        setTitle(taskObj.Title)
        setDescription(taskObj.Description);
        setDueDate(taskObj.DueDate || '');
    }, [taskObj]);


    const handleUpdate = (e) => {
        e.preventDefault();

        if (dueDate < getTodayDate()) {
            setError('The selected date cannot be in the past.');
            return;
        }

        let tempObj = {
            Title: title,
            Description: description,
            Date: dueDate
        };

        updateTask(tempObj);
    };

    
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // เดือนต้องบวก 1 และให้มี 2 หลัก
        const dd = today.getDate().toString().padStart(2, '0'); // วันที่ต้องมี 2 หลัก
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        if (modal) {
            setTitle(taskObj.Title || '');
            setDescription(taskObj.Description || '');
            setDueDate(taskObj.Date || '');
            setError('');
        }
    }, [modal, taskObj]);

    useEffect(() => {
        // กำหนดให้ input วันที่มีค่า min เป็นวันที่ปัจจุบัน
        const dateInput = document.getElementById('date');
        if (dateInput) {
        dateInput.setAttribute('min', getTodayDate());
        }
    }, []);

    // ตรวจสอบการเลือกวันที่
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = getTodayDate();

        if (selectedDate < today) {
        setError('The selected date cannot be in the past.');
        } else {
        setError('');
        }

        setDueDate(selectedDate);
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <ModalBody>
                <form>
                    <div className='form-group'>
                        <label for="title">Title <span class="required">*</span></label>
                        <input type="text" className='form-control' value={title} onChange={handleChange} name="title"></input>

                    </div>

                    <div className="form-group">
                        <label htmlFor="description">
                        Description <span className="required">*</span>
                        </label>
                        <textarea rows={5} className="form-control" id="description" value={description} onChange={handleChange} name="description"></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Due <span className='required'>*</span></label>
                        <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={dueDate}
                        onChange={handleDateChange}
                        />
                        {error && <p style={{ color: 'red' }}>{error}</p>} 
                    </div>
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button  type="submit" className='form-control' onClick={handleUpdate}>Update</Button>{''}
                </ModalFooter>
                
                </Modal>
        );
};

export default EditTask;