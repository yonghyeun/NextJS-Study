# `Routing Fundamentals`

---

라우팅과 관련된 근본적인 컨셉들을 공부하고 갑시다.

# `Routing`

---

 <img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-component-tree.png&w=3840&q=75'>

`NextJS` 에선 파일 기반 라우팅 시스템을 지원합니다.

이에 트리 구조의 파일 구조를 이용하여 라우팅을 사용 할 수 있습니다.

<img src ='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fterminology-url-anatomy.png&w=3840&q=75'>

이 때 본 서비스의 주소를 `Domain` , 이외의 모든 주소를 `path` 라 할 수 있으며

`/` 로 나뉘어진 단위 별로 하나 하나를 `Segment` 로 정의합니다.

<img src ='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Froute-segments-to-path-segments.png&w=3840&q=75'>

다음과 같은 `file conventioin` 을 따름으로서 `NextJS` 의 파일 기반 라우팅 시스템을 사용 할 수 있습니다.

<img src ='https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fpage-special-file.png&w=3840&q=75'>

각 라우팅 폴더에는 유니크한 페이지 파일이 하나 존재해야 하며 페이지 파일에는 해당 경로에서 렌더링 될 페이지의 레이아웃들을 구성합니다.

# `Linking and Navigating`

---

## `Link` 컴포넌트

---

`Link` 컴포넌트는 `a` 태그를 확장한 컴포넌트로 `routing` 되기 전 데이터를 `pre-fetching` 하거나 `SPA` 에서의 라우팅 기능을 제공합ㄴ디ㅏ.

```tsx
import Link from 'next/link';

export default function Page() {
  return <Link href='/dashboard'>Dashboard</Link>;
}
```

`prop.href` 를 통해 라우팅 될 경로를 적어줄 수 있습니다.

만약 라우팅 될 경로를 정적으로 정의해두는 것이 아니라 동적으로 하고 싶다면 템플릿 리터럴을 이용한 동적 라우팅을 이용 할 수 있습니다.

```tsx
import Link from 'next/link';

export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

### `usePathname`

`usePathname` 훅을 이용하여 현재 경로에 접근 할 수 있습니다.

#### `usePathname` 을 이용하여 동적 클래스 명 할당하는 예시

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Links() {
  const pathname = usePathname();

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href='/'>
        Home
      </Link>

      <Link
        className={`link ${pathname === '/about' ? 'active' : ''}`}
        href='/about'
      >
        About
      </Link>
    </nav>
  );
}
```

#### `usePathname` 을 이용하여 동적으로 렌더링 하는 예시

```tsx
import { usePathname } from 'next/navigation';

const MyComponent = () => {
  const pathname = usePathname();

  return (
    <div>
      <p>Current pathname: {pathname}</p>
      {pathname === '/' && <h1>Welcome to the homepage!</h1>}
      {pathname === '/about' && <h1>Learn more about us</h1>}
      {pathname.startsWith('/blog') && <h1>Welcome to our blog</h1>}
    </div>
  );
};

export default MyComponent;
```

### `id` 를 이용한 라우팅

스크롤링을 통한 네비게이팅을 하길 원하는 컴포넌트에 특정 `id` 를 입력해뒀다면

해당 `id` 를 이용한 스크롤링이 가능합니다.

```tsx
<Link href="/dashboard#settings">Settings</Link>

// Output
<a href="/dashboard#settings">Settings</a>
```

위 예시는 `dashbaord` 페이지로 라우팅 하고 `settngs` 라는 `id` 를 가진 컴포넌트까지 스크롤링 시키는 예시입니다.

### 스크롤링을 방지하는 방법

```tsx
// next/link
<Link href='/dashboard' scroll={false}>
  Dashboard
</Link>
```

특정 페이지로 라우팅 되고 나면 기본적으로 현재 어느 페이지를 보고 있든간과 상관 없이 해당 페이지의 최상단으로 스크롤링 됩니다.

하지만 `scroll props` 에 `false` 로 지정하면 스크롤링을 방지 할 수 있습니다.

## `redirect` 메소드

```tsx
import { redirect } from 'next/navigation';

async function fetchTeam(id: string) {
  const res = await fetch('https://...');
  if (!res.ok) return undefined;
  return res.json();
}

export default async function Profile({ params }: { params: { id: string } }) {
  const team = await fetchTeam(params.id);
  if (!team) {
    redirect('/login');
  }

  // ...
}
```

`redirect` 메소드는 특정 라우팅 주소로 리다이렉트 시키는 함수입니다.

위 예시에선 `team` 이 페칭이 되지 않았다면 `login` 으로 리다이렉트 시킵니다.

# 어떻게 라우팅과 네비게이팅이 작동할까 ?

`NextJS` 의 라우팅과 네비게이팅은 특별하게 작동하는데 **`code splitting` 과 `pre-fetche` 기법을 이용**합니다.

파일 기반 라우팅 시스템을 지원하는 `NextJS` 는 자동적으로 각 페이지 별 코드들을 분리해둡니다.

그 말은 `/` 페이지에선 `/` 에 해당하는 코드들만 , `/abount` 에선 `/about` 에 해당하는 코드들만 같이 말입니다.

그래서 사용자가 `/` 페이지에 접속 할 때 모든 페이지의 코드들을 읽어올 필요 없이 필요한 페이지의 코드들만 불러오면 됩니다.

이렇게 코드를 분리해두는 것은 2가지 장점을 갖습니다.

### `Code Splitting`

**1. `TTV (Time To View) / FCP (First Contentfull paint)` 가 짧습니다.**

모든 코드를 받아오는 것이 아닌 `View` 하기 위한 페이지의 코드만 불러와 렌더링 하면 되기 때문에

빠르게 첫 화면을 렌더링 하는 것이 가능합니다.

**2. `SEO` 최적화**

`SEO` 의 좋음 유무를 결정하는 다양한 기준 중 하나인 속도 면에서 `NextJS` 는 속도가 빠르기에 `SEO` 최적화가 가능합니다.

더 많은 사유로 `SEO` 최적화가 가능하지만 그것은 추후 설명토록 하겠습니다.

### `Pre-fetch`

`Code Spliiting` 되어 렌더링 되기 위한 페이지가 브라우저 단에 렌더링 되었다면

이후 `NextJS` 는 다른 페이지로 라우팅 시키거나 , 네비게이팅 시키는 컴포넌트가 뷰포트에서 클라이언트에게 노출된다면

`NextJS` 는 자동적으로 라우팅되거나 네비게이팅 될 페이지에 필요한 데이터를 미리 요청합니다.

예시를 들어 살펴보겠습니다.

```tsx
// pages/index.js
import Link from 'next/link';

const Home = () => (
  <div>
    <h1>Home Page</h1>
    <Link href='/about'>
      <a>About Page</a>
    </Link>
  </div>
);

export default Home;
```

다음과 같이 홈 페이지에서 `/about` 페이지로 라우팅 시키는 컴포넌트가 뷰포트에 노출되면

```tsx
// pages/about.js
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/about').then((res) =>
    res.json(),
  );
  return {
    props: {
      data,
    },
  };
}

const About = ({ data }) => (
  <div>
    <h1>About Page</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default About;
```

`/about` 페이지에서 사용할 데이터인 `data` 를 미리 요청한 후 정적으로 `HTML` 파일을 미리 빌드해둡니다.

이를 통해 `/about` 페이지로 라우팅 되었을 때 데이터 요청을 기다릴 필요 없이 이미 완성된 페이지를 요청받아 사용 할 수 있습니다.

### 라우터 캐시

`NextJS` 는 클라이언트 메모리에 다양한 정보를 캐시해둡니다. 이를 통해 사용자가 다른 페이지에 라우팅 되었을 때

캐싱 해둔 데이터가 있다면 최대한 캐싱해둔 데이터를 이용하여 렌더링 합니다.

이를 통해 서버와의 잦은 요청을 줄이고 속도 면에서도 더 빠르게 이용 할 수 있습니다.

### 부분적 렌더링

<img src = 'https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Fpartial-rendering.png&w=3840&q=75'>

라우팅 및 네비게이팅 하는 페이지가 이전 페이지의 부분이라면 `NextJS` 는 `Partial Rendering` 을 지원합니다.

`Route Segment` 에 맞춰 최적화 된 렌더링을 지원합니다.
