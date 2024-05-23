import Link from 'next/link';

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '40px',
  gap: '30px',
};

export default function Home() {
  return (
    <section style={style}>
      <h1>hi there !</h1>
      <Link href={{ pathname: '/todo', query: { userId: 1 } }}>
        to TODO List : User 1
      </Link>
      <Link href='/todo?userId=2'>to TODO List : User 2</Link>
      {/* userId=2 에 대한 Statically Renderng 실험 */}
      <Link href='/todo?userId=2'>to TODO List : User 2</Link>
      <Link href='/todo?userId=2'>to TODO List : User 2</Link>
      <Link href='/todo?userId=2'>to TODO List : User 2</Link>
      {/* userId=2 에 대한 Statically Renderng 실험 */}
      <Link href={{ pathname: '/todo', query: { userId: 3 } }}>
        to TODO List : User 3
      </Link>
    </section>
  );
}
