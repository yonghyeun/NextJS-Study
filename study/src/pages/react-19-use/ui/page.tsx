import { Suspense } from "react";
import { getTodos } from "../api";
import { WithUsePageFlipper } from "./item";

export const React19UsePage: React.FC = () => {
  return (
    <div>
      <section className="mb-4">
        <h1 className="text-lg">시나리오 가정</h1>
        <ol className="list-disc">
          <li>서버 액션을 통해 클라이언트 컴포넌트에게 데이터를 전달한다.</li>
          <li>
            이 때 데이터가 로딩 중일 때는 로딩 중을 표시하고, 데이터가 로딩
            완료되면 데이터를 표시한다.
          </li>
          <li>
            클라이언트 컴포넌트에선 서버에서 받은 데이터를 페이징하여 보여준다.
          </li>
        </ol>
      </section>
      <h1>With use Hooks</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WithUsePageFlipper todoPromise={getTodos()} />
      </Suspense>
    </div>
  );
};
