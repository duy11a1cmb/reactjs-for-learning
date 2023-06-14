const init = {
  todos: [
    {
      title: 'Java',
      isComplete: true,
    },
    {
      title: 'Javascript',
      isComplete: false,
    },
    {
      title: 'Ruby',
      isComplete: false,
    },
  ]
}

export default function todoReducer(state = init, action, args) {
  switch (action) {
    case 'add':
      const [title] = args;
      return {
        ...state,
        todos: [{title, isComplete: false}, ...state.todos]
      }
    default:
      return state;
  }
}