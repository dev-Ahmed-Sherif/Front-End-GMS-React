import React from 'react'

export default function TableOfFood({data}) {
  return (
    <tr>
    <th scope="row">1</th>
    <td>{data.email}</td>
    <td><img className='imgstatic' src={`http://localhost:8000/${data.imgFood}`} style={{ width: '50%', height: '50%' }} alt='foodPhoto'/></td>
    <td>{data.foodName}</td>
    <td>{data.ingredients+","}</td>
    <td><input name='quantity' type="number"/></td>
</tr>

  )
}
