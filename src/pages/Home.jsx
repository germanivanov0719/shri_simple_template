import React from 'react';
import TodoList from '../components/TodoList';

function Home() {
  return (
    <>
      <h1 data-testid="page-title">Home</h1>
      <p>This is the list.</p>
      <TodoList />
    </>
  );
}
export default Home;
