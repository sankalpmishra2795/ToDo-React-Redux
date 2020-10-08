export const addTodo = (payload) => {
  return {
    type: 'ADD_TODO',
    payload,
  };
};

export const complet = (payload) => {
  return {
    type: 'COMPLETE',
    payload,
  };
};

export const remove = (payload) => {
  return {
    type: 'DELETE',
    payload,
  };
};
export const move = (payload) => {
  return {
    type: 'MOVE',
    payload,
  };
};

export const tomove = (payload) => {
  return {
    type: 'TO_MOVE',
    payload,
  };
};
