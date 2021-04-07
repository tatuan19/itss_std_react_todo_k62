import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
 ・key：Todoを特定するID（String）
 ・text：Todoの内容（String）
 ・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import { getKey } from "../lib/util";

function Todo() {
  // const [items, putItems] = React.useState([
  //   /* テストコード 開始 */
  //   { key: getKey(), text: '日本語の宿題', done: false },
  //   { key: getKey(), text: 'reactを勉強する', done: false },
  //   { key: getKey(), text: '明日の準備をする', done: false },
  //   /* テストコード 終了 */
  // ]);

  const [filter, setFilter] = useState('ALL');
  const [items, putItems, clearItems] = useStorage();

  const handleCheck = (changedItem, isCheck) => {
    const newItem = items.map(item => {
      if (item.key === changedItem.key) {
        console.log(isCheck);
        item.done = isCheck;
      }
      return item;
    });
    putItems(newItem);
  };

  // Day la cho dinh nghia cau truc cho mot item trong items (~trong state)
  const handleAdd = (text) => {
    putItems([...items, { key: getKey(), text: text, done: false }]);
  }

  const handleFilterChange = (value) => {setFilter(value)};

  const displayItems = items.filter(item => {
    if (filter === 'ALL') return true;
    if (filter === 'TODO' && !item.done) return true;
    if (filter === 'DONE' && item.done) return true;
  });

  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input addTodo={handleAdd} />
      <Filter value={filter} onChange={handleFilterChange}/>
      {displayItems.map(item => (
        <TodoItem key={item.key} item={item} onCheck={handleCheck} />
      ))}
      <div className="panel-block">
        {displayItems.length} items
      </div>
      <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;