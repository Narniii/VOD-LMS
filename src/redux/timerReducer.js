import { TIMER } from "./actions";

const TimerReducer = (state = null, action) => {
    switch (action.type) {
        case TIMER:
            return state = action.payload

        default:
            return state
    }
}

export default TimerReducer;