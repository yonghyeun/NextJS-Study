export async function fetchData<T>(userId: string): Promise<T> {
  const EndPoint = userId
    ? `https://jsonplaceholder.typicode.com/todos?userId=${userId}`
    : 'https://jsonplaceholder.typicode.com/todos';
  const response = await fetch(EndPoint);
  const data = await response.json();

  return data.slice(0, 5) as T;
}
