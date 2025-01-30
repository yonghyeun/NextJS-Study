"use client";

import { PropsWithChildren, use, useState } from "react";
import { type Todo } from "../../api";

interface PageFlipperProps {
  todoPromise: Promise<Todo[]>;
}

export const WithUsePageFlipper: React.FC<PageFlipperProps> = ({
  todoPromise,
}) => {
  const todos = use(todoPromise);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPage = todos.length - 1;
  const todo = todos[currentPage];

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1 > totalPage ? 0 : prev + 1));
  };
  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 < 0 ? totalPage : prev - 1));
  };

  return (
    <section>
      <CurrentTodo
        totalPage={totalPage}
        currentPage={currentPage}
        todo={todo}
      />
      <div className="flex gap-2 mt-2">
        <PageFlipperButton onClick={handlePrev}>Prev</PageFlipperButton>
        <PageFlipperButton onClick={handleNext}>Next</PageFlipperButton>
      </div>
    </section>
  );
};

interface CurrentTodoProps {
  totalPage: number;
  currentPage: number;
  todo: Todo;
}

const CurrentTodo: React.FC<CurrentTodoProps> = ({
  totalPage,
  currentPage,
  todo,
}) => (
  <section className="p-4 border border-white h-48 overflow-auto">
    <h1>
      Current Page : {currentPage} / {totalPage}
    </h1>
    <h3 className="mb-2">
      <i className="border-b border-white">{todo.title}</i>
    </h3>
    <p>{todo.body}</p>
  </section>
);

interface PageFlipperButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const PageFlipperButton: React.FC<PageFlipperButtonProps> = ({
  onClick,
  children,
}) => {
  return (
    <button onClick={onClick} className="bg-gray-500 px-4 py-2 rounded-sm">
      {children}
    </button>
  );
};
