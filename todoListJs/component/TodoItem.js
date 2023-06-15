import html from "../core.js";

import {connect} from "../store.js";

function TodoItem({todo, index, indexEdit}) {

  return html`
    <li class="${todo.isComplete && 'completed'} ${indexEdit === index && 'editing'}">
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.isComplete && 'checked'} onchange="dispatch('complete',${index})">
        <label ondblclick="dispatch('setIndexEdit',[${index},document.querySelector('.edit')])">${todo.title}</label>
        <button class="destroy" onclick="dispatch('delete',${index})"></button>
      </div>
      <input class="edit" value="${todo.title}"
             onkeyup="(event.keyCode === 13) && dispatch('saveTodo',this.value.trim()) || (event.keyCode === 27) && dispatch('cancelEdit')"
             onblur="dispatch('cancelEdit')"
             autofocus
      >
    </li>
  `
}


export default connect()(TodoItem);