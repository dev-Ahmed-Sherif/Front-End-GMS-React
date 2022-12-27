import { ASSIGNEXERCISE } from "../types"


export const assignExercise=(data)=>
{
    return{
        type:ASSIGNEXERCISE,
        payload:data
    }
}