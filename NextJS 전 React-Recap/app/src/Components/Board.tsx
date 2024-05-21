import { useState } from 'react';
import PostBox, { Post } from './PostBox';

const Board = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: Math.random(),
      title: '하이',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nostrum ad sequi molestiae nulla quam voluptatum dolorem eaque sint a! Atque laudantium debitis culpa eaque eos a, sint nemo tenetur!',
    },
    {
      id: Math.random(),
      title: '하이',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nostrum ad sequi molestiae nulla quam voluptatum dolorem eaque sint a! Atque laudantium debitis culpa eaque eos a, sint nemo tenetur!',
    },
    {
      id: Math.random(),
      title: '하이',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nostrum ad sequi molestiae nulla quam voluptatum dolorem eaque sint a! Atque laudantium debitis culpa eaque eos a, sint nemo tenetur!',
    },
    {
      id: Math.random(),
      title: '하이',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, nostrum ad sequi molestiae nulla quam voluptatum dolorem eaque sint a! Atque laudantium debitis culpa eaque eos a, sint nemo tenetur!',
    },
  ]);

  return (
    <section className='flex flex-wrap gap-5'>
      {posts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Board;
