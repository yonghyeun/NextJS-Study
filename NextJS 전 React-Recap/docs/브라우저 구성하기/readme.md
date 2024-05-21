# 게시판 리스트 만들기

---

최근 `Udemy` 에서 `NextJS` 강의를 할인 하길래 12000원 주고 호다닥 구매했습니다.

그런데 강의 초반의 대부분 내용이 `React , NodeJS` 를 이용한 `Recap` 느낌이길래 한 번 해봤습니다.

구현할 컴포넌트는 `Form` 을 이용한 모달창으로 게시글을 추가하고 , 추가된 게시글을 렌더링 하는 컴포넌트들입니다.

이번 목표는 `tailwind` 와 `styled-component` 를 야무지게 써보려고 합니다.

테일윈드는 처음 써보지만 한 번 렛츠고

# `tailwind` 환경 설정

```
npm install -D tailwindcss
npx tailwindcss init
```

다음과 같이 필요한 라이브러리들을 서렁해줒고 `tailwind.config.js` 에서 다음과 같이 추가해줍니다.

```dotnetcli
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

이후 사용할 `main css` 파일인 `index.css` 에 다음과 같이 추가해줍니다.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

`tailwind` 를 사용하기 위한 설정은 끝났습니다.

_🪢 <a href = 'https://velog.io/@mjieun/React-React%EC%97%90%EC%84%9C-Tailwind-CSS-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0'>[React] React에서 Tailwind CSS 사용하기</a>_

이제 `tailwind` 에서 제공하는 클래스명을 찾아 적용해주면 `tailwind` 에서 지정된 스타일을 사용 할 수 있습니다.

매우 친절하게도 `tailwind` 공식 홈페이지에서 필요한 스타일 별 클래스 명을 매~우 이쁘게 보여줍니다.

![alt text](image.png)

하나하나 참고하면서 만들어봅시다 :)
