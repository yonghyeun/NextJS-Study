import { Scenario } from "@/shared/ui/Scenario";

export const ReactQueryWithNextJsScenario = () => {
  return (
    <Scenario title="NextJS 에서 ReactQuery를 함께 쓰는 시나리오">
      <ul>
        <li>
          해당 페이지는 json.placeholder 사이트에서 제공하는 todos 데이터 목록을
          가져오는 페이지다.
        </li>
        <li>
          클라이언트 컴포넌트는 id 값 증가, 감소 버튼을 통해 todos?id={"{id}"}
          값에 해당하는 데이터를 불러온다
        </li>
        <li>
          이 때 이전에 가져온 id 의 값은 캐싱되어 불필요한 데이터 재요청을 방지
          한다.
        </li>
        <ul>
          <h3>prefetch 요구 사항</h3>
          <li>
            MainNavigationBar에 마우스를 hover 하면 id=1 에 해당하는 todos
            데이터를 <strong>서버에서 프리페칭 하고 캐싱</strong>
            한다.
          </li>
          <li>
            클라이언트 컴포넌트에서 id 증가, 감소 버튼에 마우스를 hover 하면
            <strong>클라이언트에서 프리페칭 하고 캐싱한다.</strong>
          </li>
          <li>
            프리페칭이 일어나는 동안엔 Suspense 를 통해 로딩 상태를 보여줘야
            한다.
          </li>
        </ul>
      </ul>
    </Scenario>
  );
};
