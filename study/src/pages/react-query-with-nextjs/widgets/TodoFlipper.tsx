"use client";

import { useState } from "react";
import { type Todo } from "../api/getTodoById";

const CurrentTodo: React.FC<Todo> = ({ title, id, body }) => (
  <section className="p-4 border border-white h-48 overflow-auto">
    <h3 className="mb-2">
      <i className="border-b border-white">{title}</i>
    </h3>
    <h3 className="mb-2">todoId : {id}</h3>
    <p>{body}</p>
  </section>
);

interface TodoFlipperProps {
  todo: Todo;
}

export const TodoFlipper: React.FC<TodoFlipperProps> = ({ todo }) => {
  const [searchingTodoId, setSearchingTodoId] = useState(1);

  const handlePrev = () => {
    setSearchingTodoId((prev) => (prev - 1 > 0 ? prev : prev - 1));
  };

  const handleNext = () => setSearchingTodoId((prev) => prev + 1);

  return (
    <section>
      <CurrentTodo {...todo} />
      <div className="flex gap-2">
        <TodoFlipperButton onClick={handlePrev}> prev </TodoFlipperButton>
        <TodoFlipperButton onClick={handleNext}> next </TodoFlipperButton>
      </div>
    </section>
  );
};

const TodoFlipperButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, children }) => (
  <button className="border border-white p-2 m-2 rounded-md" onClick={onClick}>
    {children}
  </button>
);
