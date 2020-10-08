const incitialState = {
  arr: [],
};

export const reducer = (state = incitialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        arr: [...state.arr, action.payload],
      };
    case 'COMPLETE':
      let arr1 = state.arr.map((ele) => {
        if (ele.id === action.payload) {
          ele.isCompleted = true;
        }
        return ele;
      });
      return {
        ...state,
        arr: arr1,
      };
    case 'DELETE':
      let arr2 = state.arr.filter((ele) => {
        return ele.id !== action.payload;
      });
      return {
        ...state,
        arr: arr2,
      };
    case 'MOVE':
      let arr3 = state.arr.map((ele) => {
        if (ele.id === action.payload) {
          ele.trash = true;
        }
        return ele;
      });
      return {
        ...state,
        arr: arr3,
      };
    case 'TO_MOVE':
      let arr4 = state.arr.map((ele) => {
        if (ele.id === action.payload) {
          ele.trash = false;
        }
        return ele;
      });
      return {
        ...state,
        arr: arr4,
      };
    default:
      return state;
  }
};
