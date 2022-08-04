import { SIGNALER } from './actions';
import ApiCaller from '../services/api-services';

export const signaler = (signalement) => async (dispatch) => {
    try{
        const res = await ApiCaller.signaler(signalement);
        dispatch({
            type: SIGNALER,
            payload: res.data
        });
        return Promise.resolve(res.data);
    } catch (err){
        return Promise.reject(err);
    }
}