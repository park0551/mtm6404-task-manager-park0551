import React from 'react';

function TodoItem(props) {
  const { item } = props;

  return (
    <li className="todo-item">
    {props.text}
    <div className="extra-list-content">
      {props.children}
    </div>
  </li>
  );
}

export default TodoItem;
