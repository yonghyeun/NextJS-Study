import { Suspense } from "react";
import { getTodos } from "../api";
import { WithUsePageFlipper } from "./item";

export const React19UsePage: React.FC = () => {
  return (
    <div>
      <h1>With use Hooks</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WithUsePageFlipper todoPromise={getTodos()} />
      </Suspense>
    </div>
  );
};
