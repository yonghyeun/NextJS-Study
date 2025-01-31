export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getTodoById = async (id: number) => {
  await new Promise((res) => setTimeout(res, 1500));
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data: Todo = await response.json();

  return data;
};
