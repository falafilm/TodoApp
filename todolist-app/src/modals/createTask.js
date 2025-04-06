import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({ modal, toggle, save }) => {
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const [title , setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target

        if(name === 'title'){
            setTitle(value)
        }else{
            setDescription(value)
        }
    }

    const handleSave = (today) =>{

        if (!title || !description || !dueDate) {
            setError('Please fill in all required fields.');
            alert('The selected date cannot be in the past!');
            return;
        }

        
        let taskObj = {
        Title: title,
        Description : description,
        Date : dueDate
        };
        save(taskObj);
    };


    // ฟังก์ชันที่ใช้ดึงวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD
    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, '0'); // เดือนต้องบวก 1 และให้มี 2 หลัก
        const dd = today.getDate().toString().padStart(2, '0'); // วันที่ต้องมี 2 หลัก
        return `${yyyy}-${mm}-${dd}`;
    };

    useEffect(() => {
        // กำหนดให้ input วันที่มีค่า min เป็นวันที่ปัจจุบัน
        const dateInput = document.getElementById('date');
        if (dateInput) {
        dateInput.setAttribute('min', getTodayDate());
        }
    }, []);
 

    // ฟังก์ชันตรวจสอบการเลือกวันที่
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        const today = getTodayDate();

        // หากวันที่ที่เลือกน้อยกว่าวันปัจจุบัน
        if (selectedDate < today) {
        setError('The selected date cannot be in the past.');
        } else {
        setError('');
        }

        setDueDate(selectedDate);
    };





    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add Task</ModalHeader>
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
                    <Button  type="submit" className='form-control' onClick={handleSave} disabled={!!error}>Add</Button>{''}
                </ModalFooter>
                
                </Modal>
        );
};

export default CreateTask;