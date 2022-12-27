import { ASSIGNEXERCISE } from "../types";


export const assignExReducer = (state = { assignEx: [] }, action) => {
    switch (action.type) {

        case ASSIGNEXERCISE:
            
            return {
                ...state,
                assignEx: [...state.assignEx, action.payload]
            }
        default: return state;
    }
}