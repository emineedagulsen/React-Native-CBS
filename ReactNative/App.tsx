import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import Navigation from './components/Navigation';
import chatReducer from './store/reducers/chat.reducer';
import userReducer from './store/reducers/user.reducer';
import { QueryClient, QueryClientProvider } from 'react-query';


const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer,
  // posts: PostReducer
});
export type RootState = ReturnType<typeof rootReducer>


//The query key you provide is used internally for 
//refetching, caching, and sharing your queries throughout your application.
const queryClient = new QueryClient(); 



//Our aim is to keep our reducers pure.
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
// const store = createStore(rootReducer);




export default function App() {
  return (
    <QueryClientProvider client={queryClient}>

        <Provider store={store}>
          <Navigation />
        </Provider>
      </QueryClientProvider>

  )
}