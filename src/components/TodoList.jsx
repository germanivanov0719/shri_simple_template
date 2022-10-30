import React, { useCallback, useState } from 'react';
import lodash, { set } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setText } from '../store';
import TodoItem from './TodoItem';

function TodoList() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items);
  const text = useSelector((state) => state.text);

  const onChange = useCallback(({ target }) => {
    dispatch(setText(target.value));
  }, [dispatch]);

  const onClick = useCallback(() => {
    dispatch(addItem(text));
  }, [dispatch, text]);

  return (
    <div>
      <div>
        <input data-testid="input-add" value={text} onChange={onChange} />
        <button type="button" data-testid="button-add" disabled={!text} onClick={onClick}>Добавить</button>
      </div>
      <div data-testid="list" className="list">
        {lodash.map(items, (text, i) => <TodoItem key={i} index={i} />)}
      </div>
    </div>
  );
}

export default TodoList;
