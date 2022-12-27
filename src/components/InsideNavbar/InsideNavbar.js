import './InsideNavbar.css';
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


export default function InsideNavbar()
{

    return (
        <>
            <nav style={{ marginLeft: "30%", marginTop: "5%" }}>
                <ul>
                    <li>
                        <NavLink to='/foods' className="nav-link active" aria-current="page" >All Food</NavLink>
                    </li>
                    <li>
                        <NavLink to="/new" className="nav-link active" aria-current="page" >Add Food</NavLink>
                    </li>
                    <li>
                        <NavLink to="/assigntrainee" className="nav-link active" aria-current="page">Assigned Food</NavLink>
                    </li>
                    <li>
                        <NavLink to="/trainees" className="nav-link active" aria-current="page" >All Trainees</NavLink>
                    </li>
                </ul>
            </nav>

        </>
    )
}
