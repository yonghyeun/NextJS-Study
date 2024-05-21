import { useState } from 'react';
import PostBox, { Post } from './PostBox';

const Board = ({ posts }: { posts: Post[] }) => {
  return (
    <section className='grid grid-cols-3 gap-4'>
      {posts.map((post) => (
        <PostBox key={post.id} post={post} />
      ))}
    </section>
  );
};

export default Board;
