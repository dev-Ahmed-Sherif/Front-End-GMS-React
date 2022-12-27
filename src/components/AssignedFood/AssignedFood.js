// import React, { useContext } from 'react'
// import { ToCartContext } from '../../config/ToCartContext';
// import { useSelector } from 'react-redux';
// import TableOfFood from '../TableOfFood/TableOfFood';


// export default function AssignedFood()
// {

//     const cartdata = useSelector(state => state.FoodReducer.cart);
//     const { cart, setCart } = useContext(ToCartContext);


//     
//     return (
//         <table className="table my-5" style={{ width: "85%", margin: "auto" }}>
//             <thead>
//                 <tr>
//                     <th scope="col">#</th>
//                     <th scope="col">Email</th>
//                     <th scope="col">Food Image</th>
//                     <th scope="col">Food Name</th>
//                     <th scope="col">Ingredients of food</th>
//                     <th scope="col">Quantity</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {
//                     cartdata.map((item) => <TableOfFood data={item} />)
//                 }
//             </tbody>
//         </table>
//     )
// }
