"use server";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type GetTodos = () => Promise<Todo[]>;

export const getTodos: GetTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  await new Promise((resolve) => setTimeout(resolve, 1500));

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  const data: Todo[] = await response.json();

  return data.slice(0, 5);
};
