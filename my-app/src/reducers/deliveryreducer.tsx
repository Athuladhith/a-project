import {
    LOGIN_DELIVERY_PERSON_REQUEST,
    LOGIN_DELIVERY_PERSON_SUCCESS,
    LOGIN_DELIVERY_PERSON_FAIL,
} from "../constants/deliveryConstants";

interface DeliveryPersonState {
    loading: boolean;
    token: string | null;
    error: string | null;
    isAuthenticated: boolean;
    deliveryPerson: any; // You can define a more specific type for deliveryPerson if needed
}

interface DeliveryPersonLoginRequestAction {
    type: typeof LOGIN_DELIVERY_PERSON_REQUEST;
}

interface DeliveryPersonLoginSuccessAction {
    type: typeof LOGIN_DELIVERY_PERSON_SUCCESS;
    payload: any; // Replace `any` with a specific type for the delivery person data
}

interface DeliveryPersonLoginFailAction {
    type: typeof LOGIN_DELIVERY_PERSON_FAIL;
    payload: string;
}

type DeliveryPersonActionTypes =
    | DeliveryPersonLoginRequestAction
    | DeliveryPersonLoginSuccessAction
    | DeliveryPersonLoginFailAction;

export const initialState: DeliveryPersonState = {
    loading: false,
    token: localStorage.getItem('deliveryPersonToken') || null,
    error: null,
    isAuthenticated: false,
    deliveryPerson: null, // Initialize as null
};

export const deliveryPersonReducer = (
    state = initialState,
    action: DeliveryPersonActionTypes
): DeliveryPersonState => {
    switch (action.type) {
        case LOGIN_DELIVERY_PERSON_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            };
        case LOGIN_DELIVERY_PERSON_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                deliveryPerson: action.payload,
            };
        case LOGIN_DELIVERY_PERSON_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
