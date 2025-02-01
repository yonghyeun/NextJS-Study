"use client";

import { useState } from "react";
import { getTodoById, type Todo } from "../api/getTodoById";
import { useSuspenseQuery } from "@tanstack/react-query";

const CurrentTodo: React.FC<Todo> = ({ title, id, body }) => (
  <section className="p-4 border border-white h-48 overflow-auto">
    <h3 className="mb-2">
      <i className="border-b border-white">{title}</i>
    </h3>
    <h3 className="mb-2">todoId : {id}</h3>
    <p>{body}</p>
  </section>
);

export const ClientTodoFlipper: React.FC = () => {
  const [searchingTodoId, setSearchingTodoId] = useState(1);
  const { data } = useSuspenseQuery({
    queryKey: ["todo", searchingTodoId],
    queryFn: () => getTodoById(searchingTodoId),
  });

  const handlePrev = () => {
    setSearchingTodoId((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  };

  const handleNext = () => setSearchingTodoId((prev) => prev + 1);

  return (
    <section>
      <CurrentTodo {...data} />
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
