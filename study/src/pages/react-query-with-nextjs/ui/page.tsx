import { ReactQueryWithNextJsScenario, TodoFlipper } from "../widgets";
import { getTodoById } from "../api";

export const Page = async () => {
  const todo = await getTodoById(1);

  return (
    <section>
      <TodoFlipper todo={todo} />
      <ReactQueryWithNextJsScenario />
    </section>
  );
};
