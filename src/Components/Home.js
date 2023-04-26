import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';


const Home = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem("data")) ?? []);
    const [completedList, setCompletedList] = useState(JSON.parse(localStorage.getItem("completed")) ?? []);
    const [show, setShow] = useState(false);
    const [editId, setEditId] = useState(null);
    const handleClose = () =>{ 
        // console.log(id);
        setShow(false);
        setEditId(null);
        setTodo("");
    };
    const handleShow = (id) =>{
        setShow(true);
        setEditId(id);
        setTodo(todoList[id])
        console.log(id);
    };

    const handleComplete = (id) =>{
        console.log(id, "idddddddddddddd");
        // setCompletedList(todoList[id]);
        let temp = [...completedList, todoList[id]];
        // console.log(temp, "tempppppppppp");
        localStorage.setItem("completed", JSON.stringify(temp));
        setCompletedList(temp);

        todoList.splice(id,1);
        // localStorage.removeItem("data",todoList[id]);
        localStorage.setItem("data", JSON.stringify(todoList));
    }

    const handleEdit = () =>{
        // let temp = [...completedList, todo];
        // localStorage.setItem("completed", JSON.stringify(temp));
        // setCompletedList(temp);

        
        todoList.splice(editId,1,todo);
        localStorage.setItem("data", JSON.stringify(todoList));
        // console.log(editId, todoList, temp);
        // setTodoList(temp);

        handleClose();
    }
        
    // console.log(todoList)
    // console.log(todoList, "hhhhhhhhhhhh");
    const handelsubmit = (event) => {
        event.preventDefault();
        // console.log(todo);
        let data = [...todoList, todo];
        if(todo!==""){
            setTodoList(data);
            localStorage.setItem("data", JSON.stringify(data));
        }
        return;
    }

    const deleteTodo = (id) => {
        const items = todoList.filter((element, ind) => {
            return ind !== id;
        });
        localStorage.setItem("data", JSON.stringify(items));
        setTodoList(items);
    }
    const deleteCompleted = (id) => {
        const items = completedList.filter((element, ind) => {
            return ind !== id;
        });
        localStorage.setItem("completed", JSON.stringify(items));
        setCompletedList(items);
    }

    return (
        <>
            <form onSubmit={handelsubmit}>
                <div className="d-flex justify-content-center mt-4">
                    <input className="form-control w-50" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Todo task" />
                    <button className="text-white bg-success px-3 border border rounded-2 ms-3"> <FontAwesomeIcon icon={faPlus} /> Add</button>
                </div>
            </form>

            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-6">
                        <h5>Todo</h5>
                        {
                            todoList.map((item, ind) => {
                                return (
                                    <div className="d-flex justify-content-center mt-3" key={ind}>
                                        <div className="card w-75" >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-1">
                                                        <FontAwesomeIcon type="button" className="me-2" icon={faPencilAlt} size="1x" color="blue" onClick={ () =>handleShow(ind)} />
                                                    </div>
                                                    <div className="col-9 text-start">
                                                        <h4>{item}</h4>
                                                    </div>
                                                    <div className="col-1">
                                                        <FontAwesomeIcon type="button" className="text-end" icon={faCheck} size="1x" color="green" onClick={ () =>handleComplete(ind)} />
                                                    </div>
                                                    <div className="col-1">
                                                        <FontAwesomeIcon type="button" className="text-end" icon={faTrash} size="1x" color="red" onClick={() => deleteTodo(ind)} />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className="col-6">
                        <h5>Completed</h5>
                        {
                            completedList.map((item, ind) => {
                                return (
                                    <div className="d-flex justify-content-center mt-3" key={ind}>
                                        <div className="card w-75" >
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-10 text-start">
                                                        <h4>{item}</h4>
                                                    </div>
                                                    <div className="col-2">
                                                        <FontAwesomeIcon type="button" className="text-end" icon={faTrash} size="1x" color="red" onClick={() => deleteCompleted(ind)} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>


            {/* model */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEdit}>
                        <input className="form-control" type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )


}
export default Home;