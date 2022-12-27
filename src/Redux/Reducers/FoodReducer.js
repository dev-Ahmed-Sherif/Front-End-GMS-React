import { ADDTOUSER} from "../types";
import { DELFROMUSER } from "../types";
export const FoodReducer=(state={cart:[]},action)=>
{
    
    switch(action.type)
    {
        case ADDTOUSER:
            {
            
                 return{
                    ...state,
                    cart:[...state.cart,action.payload]
                  
                }
    

            }
        case DELFROMUSER:
                {
                    
                    
                   
                    
                        // ...state,
                       state.cart = state.cart.filter((p)=> 
                            p.foodName != action.payload
                                
                       )
                    
                    
                    
                    
                }
        default:return state;
       
    }
}
