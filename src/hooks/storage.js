import { useState, useEffect } from 'react';

/* 
  【Storageフック】
　・TodoをlocalStorageを使って保存する
　・以下機能をサポートする
　  - localstrageに保存されているすべてのTodoの読み出し機能
　  - Todoをlocalstrageに保存する
　  - localstrageにあるTodoを削除する
*/

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const initialData = localStorage.getItem(STORAGE_KEY);

    if (!initialData) {
      // Day la cho dinh nghia cho items la mot mang []
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      setItems(JSON.parse(initialData));
    }
  }, []);

  const putItems = items => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setItems(items);
  };

  const clearItems = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setItems([]);
  };

  return [items, putItems, clearItems];
}

export default useStorage;