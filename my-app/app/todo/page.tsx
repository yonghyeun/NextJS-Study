import { fetchData } from '@/lib/fetchData';
import { Suspense } from 'react';

type Todo = {
  userid: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoSearchParam = {
  userId: string;
};

async function TodoList({ searchParams }: { searchParams: TodoSearchParam }) {
  const { userId } = searchParams;
  const todos = await fetchData<Todo[]>(userId);
  return (
    <ul>
      {todos.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
}

function Loading() {
  return <div> data is Loading ...</div>;
}

export default function Page({
  searchParams,
}: {
  searchParams: TodoSearchParam;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <TodoList searchParams={searchParams} />
    </Suspense>
  );
}
