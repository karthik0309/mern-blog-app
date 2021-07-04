const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: false,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        user: false,
        isFetching: false,
        error: false,
      };
    case 'UPDATE_USER':
      return{
        user:action.payload,
        isFetching: false,
        error: false,
      }
    case 'DELETE_ACCOUNT':
      return{
        user:false,
        isFetching: false,
        error: false,
      }
    default:
      return state;
  }
};

export default Reducer;