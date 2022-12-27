import { DELETEEXERCISE } from "../types";


export const deleteReducer = (state = { del: [] }, action) => {
    switch (action.type) {

        case DELETEEXERCISE:
            
            return {
                ...state,
                del: [...state.del, action.payload]
            }
        default: return state;
    }
}