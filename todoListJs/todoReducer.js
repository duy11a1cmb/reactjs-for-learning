import storage from "./util/storage.js";

const init = {
  todos: storage.get(),

  filter: 'all',

  filters: {
    all: () => true,
    active: (todo) => !todo.isComplete,
    completed: (todo) => todo.isComplete
  },

  indexEdit: null
}

const actions = {
  add(state, title) {
    state.todos = [{title, isComplete: false}, ...state.todos];
    storage.set(JSON.stringify(state.todos));
  },
  complete(state, index) {
    state.todos[index].isComplete = !state.todos[index].isComplete;
    storage.set(JSON.stringify(state.todos));
  },
  completeAll(state, checked) {
    if (state.todos.length > 0) {
      state.todos.forEach((todo) => {
        todo.isComplete = checked;
      })
    }
  },
  delete(state, index) {
    state.todos.splice(index, 1);
    storage.set(JSON.stringify(state.todos));
  },
  changeFilter(state, type) {
    state.filter = type
  },
  clearCompleted(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(JSON.stringify(state.todos));
  },
  setIndexEdit(state, [index, el]) {
    setTimeout(() => {
      const input = document.querySelectorAll('.edit')[index];
      const end = input.value.length;
      input.setSelectionRange(end, end);
      input.focus();
    }, 0)

    state.indexEdit = index;
  },
  saveTodo(state, value) {
    if (state.indexEdit !== null) {
      if (value) {
        state.todos[state.indexEdit].title = value;
        storage.set(JSON.stringify(state.todos));
      } else {
        this.delete(state, state.indexEdit);
      }
      state.indexEdit = null;
    }
  },
  cancelEdit(state) {
    state.indexEdit = null;
  }
}

export default function todoReducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
}