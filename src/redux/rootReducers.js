
import { combineReducers } from 'redux';
import BlogsPostReducers from './reducers/BlogsPostReducers';

const rootReducers = combineReducers({blogPost: BlogsPostReducers});

export default rootReducers;