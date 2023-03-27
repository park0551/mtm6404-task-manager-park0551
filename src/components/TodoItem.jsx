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
        {priority === 'high' ? <span className='priority-flag'><i className="fas fa-flag" /></span> : <span className='priority-flag'><i className="far fa-flag" /></span>}
        <button className='completed-btn'>{completed ? <i className="fas fa-check-circle" /> : <i className="far fa-circle" />}</button>
        <button className="remove-btn" onClick={handleRemoveClick}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
