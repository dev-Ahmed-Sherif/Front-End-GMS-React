import { DELETEEXERCISE } from "../types"

export const deleteExercise=(data)=>
{
    return{
        type:DELETEEXERCISE,
        payload:data
    }
}