import { DELFROMUSER } from "../types"
export const delFromUser=(data)=>
{
    return{
        type:DELFROMUSER,
        payload: data
    }
}