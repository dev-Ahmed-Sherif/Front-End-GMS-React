
import './RepeatedToDoTask.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addFav } from '../../Redux/Actions/favAction';
import { Link, NavLink } from 'react-router-dom';

function RepeatedToDoTask({ data }) {

    

    return (

        <tr>
            <th scope="row">1</th>
            <td>userEmail</td>
            <td><img className='imgstatic' src={data.imgStatic} style={{ width: '100%', height: '100%' }} alt='oooo'></img></td>
            <td>{data.exerciseName}</td>
            <td>{data.exTools+","}</td>
            <td>{data.exAdditionNotes+","}</td>
            {/* <td>{data.paragraphExplainSteps[1]}</td> */}
        </tr>

    )
}

export default RepeatedToDoTask;