import { ReactQueryWithNextJsScenario, ClientTodoFlipper } from "../widgets";
import { getTodoById } from "../api";
import { PropsWithChildren, Suspense } from "react";
import {
  defaultShouldDehydrateQuery,
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const Page = () => {
  return (
    <section>
      <ServerTodoComponent>
        <Suspense fallback={<div>loading...</div>}>
          <ClientTodoFlipper />
        </Suspense>
      </ServerTodoComponent>
      <ReactQueryWithNextJsScenario />
    </section>
  );
};

// 전체 페이지의 렌더링을 await 하지 않기 위해 만든
// api 요청 wrapper 컴포넌트
const ServerTodoComponent: React.FC<PropsWithChildren> = ({ children }) => {
  const DEFAULT_TODO_ID = 1;
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          query.state.status === "pending" ||
          defaultShouldDehydrateQuery(query),
      },
    },
  });

  queryClient.prefetchQuery({
    queryKey: ["todo", DEFAULT_TODO_ID],
    queryFn: () => getTodoById(DEFAULT_TODO_ID),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};
