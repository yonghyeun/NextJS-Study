# `Why NextJS` ?

---

`NextJS` 를 배우기 전 왜 `NextJS` 를 배워야 할지에 대해 생각해봅시다.

`NextJS` 는 `React` 공식 문서에서도 추천하는 `Modern React` 를 사용하기 위한 프레임 워크입니다.

`React` 만 사용하여 프로덕션을 생성 할 때 발생하는 여러 문제점들을 살펴보겠습니다.

## `React` 만을 이용하여 애플리케이션을 만들 떄의 한계점

### `Slow TTV / FCP`

---

`React` 로 개발 된 페이지가 사용자의 브라우저에 렌더링 되기 전 까지의 과정을 생각해봅시다.

1. 사용자가 `/` 경로에 도달하여 `index.html` 파일을 받습니다.
2. `index.html` 파일을 브라우저가 파싱하며 `script` 태그를 발견하고 `React` 로 이뤄진 자바스크립트 코드를 요청하여 받아옵니다.
3. `index.html` 파일을 모두 파싱하여 `Render Tree`를 완성합니다. 이 때 `Actual DOM`은 완성되었더라도 브라우저에 렌더링 되는 화면은 없습니다. `index.html` 엔 그저 `div id = root` 만 존재하기 때문입니다.

4. 이후 `script` 태그로 받은 `React` 코드를 파싱하여 실행합니다. 이 때 파싱되는 코드들은 `lazy` 와 같은 기법을 이용하지 않았다면 **모든 페이지를 구성하는 컴포넌트** 들을 파싱합니다.
5. `React` 코드를 모두 파싱하였다면 브라우저 상에 `React` 로 구성한 컴포넌트들을 렌더링 합니다.

이런 과정을 생각해보면 클라이언트는 `React` 의 모든 코드가 파싱되기 전까지 브라우저에서 빈 화면을 보고 있게 됩니다.

이는 `Low TTV , FCP` 를 야기하는데 `TTV` 는 `Time to View` , `FCP` 는 `First Contentfull Paint` 를 의미합니다.

즉 , 사용자가 첫 화면을 보기 까지 오랜 시간이 걸린다는 겁니다. 모든 페이지의 컴포넌트를 파싱하니까요

### 라우팅 미지원

---

`React` 에선 라우팅을 기본적으로 지원하지 않습니다. 이에 라우팅을 지원하는 라이브러리들을 `React` 와 함께 사용하게 됩니다.

`NextJS` 가 아닌 라우팅 라이브러리는 `react-router-dom` 과 같은 라이브러를 사용합니다.

```tsx
// App.js
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import DashboardSettings from './pages/DashboardSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'contact',
    element: <Contact />,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'settings',
        element: <DashboardSettings />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

개발자는 페이지 별 렌더링 될 화면 뿐 아니라 라우팅 될 경로들도 신경써야 합니다.

하지만 `NextJS` 를 이용하게 되면 라우팅 경로와 로직을 신경쓰지 않고 그저 폴더들과 파일들만 잘 정의해주면 됩니다.

그러면 `NextJS` 가 알아서 라우팅 계층을 정의해줍니다.

### 데이터 페칭 로직의 복잡함

`React` 에서 데이터를 패칭하기 위해선 `fetch API` 나 `axios` 와 같은 써드파티 라이브러리를 사용해야 합니다.

또 그 뿐 아니라 비동기적으로 데이터를 패칭해오기 위해서는 `useEffect` 와 같은 훅이나 커스텀 훅 들을 이용해 컴포넌트를 구성해줘야 합니다.

밑의 예시는 `React` 만 사용 했을 때 컴포넌트의 모습입니다.

```tsx
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default MyComponent;
```

컴포넌트 내부에서 데이터를 패칭하여 렌더링 하는 예시입니다.

위 컴포넌트는 세 가지 역할을 합니다. 데이터 페칭, 상태 관리 , 하나는 렌더링

이렇게 많은 역할을 하는 뚱뚱한 컴포넌트는 컴포넌트의 역할을 모호하게 하여 가독성이 떨어질 뿐 아니라 관리하기가 어렵습니다.

하지만 `NextJS` 는 컴포넌트의 역할을 단순하게 렌더링에만 집중 할 수 있도록 책임을 분리해둡니다.

```tsx
// pages/index.js
export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

const HomePage = ({ data, error }) => {
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Data fetched from API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
```

컴포넌트에서 사용 할 데이터를 `NextJS` 의 네임 컨벤션을 따르는 함수들을 이용해 데이터를 패칭하는 계층을 따로 만들고

해당 계층에 의존성을 갖는 컴포넌트를 만들어 계층에서 반환하는 `props` 를 받아 렌더링 로직에만 집중 할 수 있습니다.

### `Poor SEO`

`React` 만을 이용한 애플리케이션의 고질적인 단점은 `SEO(Search Engine Optimization)` 가 낮다는 점입니다.

`SEO` 는 검색 엔진 최적화를 의미하는 것으로 `SEO` 가 높을 수록 브라우저의 `SERP (Search Engine Results Pages)` 에서 상단에 존재하여 높은 클라이언트들의 유입을 이끌 수 있습니다.

높은 `SEO` 을 구성하기 위해선 다음과 같은 원칙들을 지켜야 합니다.

**콘텐츠 접근성**

검색 엔진에서 모든 컨텐츠에 엑세스 할 수 있어야 합니다.

콘텐츠 접근성은 해당 페이지를 구성하는 `HTML` 태그들을 검색 엔진이 보고 판단합니다.

**`URL` 구조**

예를 들어 `www.어쩌구저쩌구.com/about` 경로에는 `/about` 과 관련된 내용이 존재해야 합니다.

하지만 `React` 로만 구성 할 경우 어떤 페이지들과 상관 없이 검색 엔진이 볼 수 있는 `HTML` 태그는 오로지 `div id = root` 뿐입니다.

**페이지 로드 속도**

검색 엔지 순위에 영향을 미치는 요소는 해당 페이지가 렌더링 될 때 까짖 걸리는 속도도 존재합니다.

앞서 말했듯 `React` 만으로 구성된 애플리케이션은 페이지 속도가 상대적으로 느립니다.

하지만 `NextJS` 는 `React` 의 `CSR` 로직 뿐 아니라 `SSR` 을 지원하기 때문에 각 라우팅 경로 별 제공 될 `HTML` 파일들을 미리 정의해두고 배포하기 때문에 속도도 빠르고 `SEO` 관점에서 검색 엔진이 판단하기에 더 높은 콘텐츠 접근성으로 평가 할 수 있습니다.

## `NextJS` 에서 지원하는 더 다양한 기능들

<table>
  <thead>
    <tr>
      <th>기능</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>라우팅</td>
      <td>레이아웃, 중첩 라우팅, 로딩 상태, 오류 처리 등을 지원하는 서버 컴포넌트 위에 구축된 파일 시스템 기반 라우터</td>
    </tr>
    <tr>
      <td>렌더링</td>
      <td>클라이언트 및 서버 컴포넌트와 함께 클라이언트 및 서버 측 렌더링. Next.js로 서버에서 정적 및 동적 렌더링을 최적화. Edge 및 Node.js 런타임에서 스트리밍 지원</td>
    </tr>
    <tr>
      <td>데이터 가져오기</td>
      <td>서버 컴포넌트에서 async/await로 간소화된 데이터 가져오기, 요청 메모화, 데이터 캐싱 및 재검증을 위한 확장된 fetch API</td>
    </tr>
    <tr>
      <td>스타일링</td>
      <td>CSS Modules, Tailwind CSS, CSS-in-JS 등 선호하는 스타일링 방법 지원</td>
    </tr>
    <tr>
      <td>최적화</td>
      <td>Core Web Vitals 및 사용자 경험을 향상시키기 위한 이미지, 폰트 및 스크립트 최적화</td>
    </tr>
    <tr>
      <td>타입스크립트</td>
      <td>더 나은 타입 검사와 효율적인 컴파일을 위한 향상된 TypeScript 지원, 사용자 정의 TypeScript 플러그인 및 타입 체커</td>
    </tr>
  </tbody>
</table>

그 뿐 아니라 더욱 많은 기능들을 제공합니다.

`NextJS` 프레임워크 위에서 `React` 를 이용해 개발을 한다면 더 높은 `DX` 뿐 아니라

성능 상에서도 이점을 가져올 수 있습니다.
