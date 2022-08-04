import { SIGNALER } from './redux/actions';

const initialState = {};
export default function appReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
      case SIGNALER:
            return { ...state, data : payload };
      default:
        return state
    }
}