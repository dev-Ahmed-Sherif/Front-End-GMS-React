import './TableOfTrainee.css'
import React, { } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap';

export default function TableOfTrainee({ data })
{
    var foodHistoryCounter = 0;

    
    const NavigateTo = useNavigate();

    function FoodTraineeNav(userEmailToFood)
    {
        
        
        // NavigateTo('/AllExercise',{userEmailToEx});
        NavigateTo('/foods', {
            state:
                { clientEmail: userEmailToFood || '' }


        })

    }

    const [isShow, invokeModal] = React.useState(false)
    const initModal = (item) =>
    {
        
        invokeModal(!isShow)
    }
    return (
        <tr>
            <th scope="row">1</th>
            <td>{data.email}</td>
            <td>{data.role}</td>
            <td>{data.subscription}</td>
            <td><button className='buttonApi' onClick={() => { initModal(data.healthyFoodHistory) }}>Show History</button></td>
            <td><button className="buttonApi" aria-current="page" onClick={() => { FoodTraineeNav(data.email) }}>Assign Food</button></td>

            <Modal show={isShow} scrollable={true}>
                <Modal.Header closeButton onClick={initModal} style={{ background: "var(--onyx-darker)" }}>
                    <Modal.Title style={{ color: "--basic-c-white" }}>Add New Food</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "var(--onyx-darker)" }}>
                    {/* {if(data.exersiceHistory.length > 0)} */}
                    {
                        data.healthyFoodHistory.map((item) => <div>
                            <p style={{ display: "none" }}>{foodHistoryCounter++}</p>

                            <p style={{ color: "var(--prime)" }}>Foodnumber. {foodHistoryCounter} </p>
                            <img src={`http://localhost:8000/${item.imgFood}`} style={{ width: "50%" }} alt="foodPhoto" />
                            <p >Food Name: {item.foodName}</p>
                            <p >Food Time: {item.foodTime}</p>
                            <p >Food Type: {item.foodType}</p>
                            <p >Ingredients of food: {item.ingredients}</p>
                            <p>{item.date}</p>
                        </div>)
                    }
                </Modal.Body>
            </Modal>
        </tr>
    )
}
