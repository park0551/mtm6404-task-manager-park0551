import React from 'react';

function ListNavigation(props) {
  const { items } = props;

  if (!items) {
    return <div>No items to display</div>;
  }

  return (
    <div className="list-navigation">
      <ul>
        {items.map((item) => (
          <ListItem key={item.id} id={item.id} text={item.text} />
        ))}
      </ul>
    </div>
  );
}

export default ListNavigation;
