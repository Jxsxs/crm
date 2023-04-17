const initialState ={
    currentUser: {},
    isAuth: false,
}
export const authReducer = (state=initialState, action) => {
if(action.type==='CURRENT-USER'){
    return{...state, currentUser: action.user, isAuth: true}
}if(action.type==='CHANGE-INFO'){
  return {
    ...state,
    currentUser: {
      ...state.currentUser,
      firstName: action.firstName,
      lastName: action.lastName,
      age: action.age,
    },
    isAuth: true
  };
}if(action.type==='RESET-CURRENT-USER'){
  return{...state, currentUser: {} , isAuth: false}
}
return state;
} 

export const setCurrentUser = (user) => ({
    type: 'CURRENT-USER',
    user
  });

  export const resetCurrentUser = () => ({
    type: 'RESET-CURRENT-USER',
  });

  export const changeInfo =(firstName, lastName, age) => ({
    type: 'CHANGE-INFO',
    firstName, 
    lastName, 
    age, 
  })