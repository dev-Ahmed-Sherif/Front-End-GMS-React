import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../config/axios'
import { Route, Routes, useLocation } from 'react-router-dom';
import RepeatedToDoTask from '../components/repeatedToDoTask/RepeatedToDoTask'

function ToDoListExercise()
{
    
    const [exercise, setExercise] = useState([])

    useEffect(() =>
    {

        // rest of api link
        axiosInstance.get('/client').then((res) =>
        {
            
            setExercise(res.data)
        })
    }, [])

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image Gif</th>
                    <th scope="col">Name</th>
                    <th scope="col">Tools</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
                {
                    exercise.map((item) => <RepeatedToDoTask data={item} />)
                }
            </tbody>
        </table>

    )
}

export default ToDoListExercise