import { ADDFAV } from "../types";


export const favReducer = (state = { fav: [] }, action) => {
    switch (action.type) {

        case ADDFAV:
            
            
            return {
                ...state,
                fav: [...state.fav, action.payload]
            }
        default: return state;
    }
}