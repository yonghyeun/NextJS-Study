해당 폴더는 App routing 기반의 NextJS 프로젝트에서

FSD 구조의 폴더를 사용하기 위해 만들어진 폴더입니다.

FSD 구조에선 pages 라는 레이어가 존재하는데 해당 레이어와 NextJS의 라우팅의 충돌을 막기 위해 만들어둔

더미 폴더 입니다.

해당 더미 폴더로 인해 NextJS 는 src 내부에 존재하는 FSD 레이어인 pages 폴더를 인식하지 않고

빈 더미 폴더로 pages 라우터를 비활성화 하고 app routing만 사용하도록 합니다.
