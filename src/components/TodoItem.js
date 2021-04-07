import React from "react";

/* 
  【TodoItemコンポーネント】
 ・Todoアイテムを表示する
 ・チェックボックスにチェックが入っているか管理する
 ・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem({ item, onCheck }) {
  const handleChange = (event) => {
    onCheck(item, event.target.checked);
  }
  return (
    <label className="panel-block">
      <label className="panel-block">
        <input type="checkbox" onChange={handleChange} checked={item.done}/>
        
        <span className={item.done ? 'has-text-grey-light' : ''}>{item.text}</span>
      </label>
    </label>
  );
}

export default TodoItem;