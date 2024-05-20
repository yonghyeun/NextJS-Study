# `NextJS` 의 라우팅

---

## 파일 기반 라우팅 시스템

---

기존 `SPA` 에서 라우팅을 지원하는 라이브러리는 `react-router-dom` 과 같은 라우팅 라이브러리가 존재합니다.

`react-router-dom` 은 다음과 같이 사용합니다.

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

라우팅 경로에 따른 컴포넌트들을 생성해둔 후 `createBrowserRouter` 를 이용하여 `path` 별 렌더링 될 페이지를 나타내는 컴포넌트를 연결시켜줍니다.

이렇게 `react-router-dom` 은 `configuration-based-routing` 을 지원합니다. 즉, 라우팅 될 경로와 렌더링 될 컴포넌트를 미리 설정해두고 경로에 맞춰 라우팅을 지원합니다.

> 모든 라우팅은 `window.history API` 를 조작하여 경로와 렌더링 되는 페이지를 동기화 시켜 진행됩니다.

하지만 `NextJS` 에서는 `file-based routing` 을 지원합니다.

`app` 이라는 폴더 내에서 `NextJS` 가 인식 할 수 있는 네임 컨벤션만 지킨다면 따로 라우팅 경로를 설정해두지 않더라도

파일의 경로에 맞춰 라우팅을 가능하게 합니다.

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-segments-to-path-segments.png&w=3840&q=75'>

이런식으로 말입니다.

이렇게 따로 라우팅 경로를 `configuration` 하는 것에 신경쓰지 않더라도 파일 구조 만으로 라우팅을 지원하기 떄문에 이는 `DX` (개발 경험) 관점에서 큰 도움을 줍니다.

`app` 폴더는 `URL Path` 에서 가장 최초 경로인 `/` 를 의미하고

그 이후 각 폴더들을 기점으로 세그먼트를 추가해나갑니다.

이런 파일 기반 라우팅을 하기 위해선 몇 가지 규칙과 네임 컨벤션을 따라야 합니다.

## `NextJS` 의 네임 컨벤션

---

<table>
  <thead>
    <tr>
      <th>파일</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>layout</td>
      <td>세그먼트와 그 자식들에 대한 공유 UI</td>
    </tr>
    <tr>
      <td>page</td>
      <td>경로의 고유 UI로 경로를 공개적으로 접근 가능하게 함</td>
    </tr>
    <tr>
      <td>loading</td>
      <td>세그먼트와 그 자식들에 대한 로딩 UI</td>
    </tr>
    <tr>
      <td>not-found</td>
      <td>세그먼트와 그 자식들에 대한 Not Found UI</td>
    </tr>
    <tr>
      <td>error</td>
      <td>세그먼트와 그 자식들에 대한 에러 UI</td>
    </tr>
    <tr>
      <td>global-error</td>
      <td>글로벌 에러 UI</td>
    </tr>
    <tr>
      <td>route</td>
      <td>서버 사이드 API 엔드포인트</td>
    </tr>
    <tr>
      <td>template</td>
      <td>특수 재렌더링 레이아웃 UI</td>
    </tr>
    <tr>
      <td>default</td>
      <td>병렬 경로에 대한 폴백 UI</td>
    </tr>
  </tbody>
</table>

## 계층적 컴포넌트 구성

위와 같은 네임 컨벤션에 맞춰 파일들을 정의해둔 후 파일에 정의된 컴포넌트들을 이용하여 계층적 구조를 표현 할 수 있습니다.

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ffile-conventions-component-hierarchy.png&w=3840&q=75'>

각 파일 별에 대한 로직은 추후 공식 튜토리얼을 따라가면서 하나 하나 차근 배워가겠습니다.

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-file-conventions-component-hierarchy.png&w=3840&q=75'>

위 예시처럼 각 세그먼트를 의미하는 폴더 내에서 라우팅 될 폴더를 중첩하여 사용하여

중첩된 라우팅 경로를 정의하거나 , 상위 라우팅 경로에서 사용하는 레이아웃들을 재사용 하는 것이 가능합니다.

# `NextJS` 의 페이지 구성

---

## `Pages`

---

<img src ='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fpage-special-file.png&w=3840&q=75'>

라우팅 경로를 나타내는 폴더에서 `NextJS` 의 네임 컨벤션을 따르는 파일들을 이용해 페이지를 구성 할 수 있습니다.

라우팅 세그먼트 폴더에서 페이지 파일은 **유니크하게 하나만 존재** 해야 합니다.

## `Layouts`

---

`Layout` 은 해당 세그먼트에서 **공유 될 양식** 을 의미합니다.

`Layout` 컴포넌트는 여러 경로에서 공유되기 때문에 한 번 마운트 되고나면 해당 레이아웃이 정의된 경로를 벗어나지 않는 한 `UnMount` 되지 않습니다.

**그렇기 때문에 `Layout` 컴포넌트는 상태를 저장하여 하위 컴포넌트들에게 전달하는 역할도 합니다.**

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Flayout-special-file.png&w=3840&q=75'>

```tsx
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>

      {children}
    </section>
  );
}
```

주로 `layout` 컴포넌트는 해당 세그먼트에서 반복적으로 사용 할 공통적인 양식을 작성하고

공통된 양식에서 변경이 일어날 페이지들이 위치할 공간을 `children` 부분에 위치시킵니다.

### `Root layout`

특징적으로 `app` 디렉토리에 존재하는 `layout` 컴포넌트는 모든 세그먼트에서 공통적으로 사용 될 레이아웃이기 때문에 `html , body` 태그를 갖춘 레이아웃이여야 합니다.

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}
```

루트 디렉토리에 존재하는 `layout` 에 `html , body` 태그를 작성해줌으로서 하위 세그먼트에선

렌더링 될 컴포넌트들만 집중하여 생성해주면 됩니다.

### `nested layout`

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fnested-layouts-ui.png&w=3840&q=75'>

각 레이아웃들은 중첩하여 사용 가능합니다.

각 레이아웃들은 라우팅 구조에 맞게 적절히 배분됩니다.

## `Templates`

---

`Templates` 컴포넌트는 `children` 을 받아 랩핑하는 것으로 `Layout` 컴포넌트와 유사한 점이 많지만

**`Templates` 컴포넌트는 하위 경로들에게 공유되지 않는점이 `Layout` 과 다릅니다.**

즉 해당 템플릿 컴포넌트가 정의 된 경로 외로 이동하게 된다면 `UnMount` 되기 때문에 상태를 저장하지 않습니다.

<img src ='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ftemplate-special-file.png&w=3840&q=75'>

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

이런 템플릿 컴포넌트는 다음과 같은 경우에 유용합니다.

- 해당 경로에서만 저장해야 하는 상태나 데이터를 저장해야 하는 경우
- 경로에 들어올 떄 마다 항상 초기화 해야 하는 경우
- 생명주기가 짧은 컴포넌트들을 정의해야 하는 경우

```tsx
<Layout>
  {/* Note that the template is given a unique key. */}
  <Template key={routeParam}>{children}</Template>
</Layout>
```

위 예시처럼 `Layout , Template` 컴포넌트를 이용하여 `Page` 컴포넌트를 구성 할 수 있습니다.
