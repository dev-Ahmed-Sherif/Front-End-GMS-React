import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { produceReducer } from "./produceReducer";
import { pagenateReducer } from "./pagenateReducer";
import { cartReducer } from "./cartReducer";
import { userReducer } from "./userReducer";
import { favReducer } from './favReducer'
import { deleteReducer } from './deleteReducer'
import { FoodReducer } from './FoodReducer';
import { notificationReducer } from './notificationReducer';
export default combineReducers({
    productReducer,
    produceReducer,
    pagenateReducer,
    cartReducer,
    userReducer,
    favReducer,
    deleteReducer,
    FoodReducer,
    notificationReducer,
});
