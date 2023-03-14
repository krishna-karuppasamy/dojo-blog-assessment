import {legacy_createStore as createStore, applyMiddleware} from 'redux'
import rootReducers from './rootReducers';
import reduxImmutableStateVariant from 'redux-immutable-state-invariant'

export function configStore(initial){

    return createStore(rootReducers, initial,  applyMiddleware(
        reduxImmutableStateVariant()
    ));

}

export default configStore;