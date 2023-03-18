import React from 'react';

function TodoItem(props) {
const { text, priority, completed = false, onRemove } = props;

const handleRemoveClick = () => {
onRemove(props.id);
};

return (
  <li className="todo-item">
    {text}
    <div className="extra-list-content">
      <span>{priority ? <i className="far fa-flag" /> : <i className="fas fa-flag" />}</span>
      <span>{completed ? <i className="fas fa-check-circle" /> : <i className="far fa-circle" />}</span>
      <button className="remove-btn" onClick={handleRemoveClick}>
      <i className="fas fa-trash-alt"></i>
      </button>
      {props.children}
    </div>
  </li>
);
}

export default TodoItem;