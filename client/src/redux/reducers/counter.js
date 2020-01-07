const initialState = {
    age: 22,
    userName:"Satya"
};

const counterReducer = (state = initialState, action) => {
    const newState = { ...state };

    if (action.type === 'ADD_TASK') {
        newState.age++;
    }
    if (action.type === 'DEL_TASK') {
        newState.age--;
    }
    if (action.type === 'MATCH_NAME') {
        newState.age--;
    }
    return newState;
};

export default counterReducer;