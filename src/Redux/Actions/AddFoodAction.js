import { ADDTOUSER } from "../types"
export const addToUser=(data)=>
{
    return{
        type:ADDTOUSER,
        payload: data
    }
}