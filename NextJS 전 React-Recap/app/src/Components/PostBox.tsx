export type Post = {
  id: number;
  title: string;
  content: string;
};

const PostBox = ({ post }: { post: Post }) => {
  return (
    <section className='border px-8 py-2 rounded w-1/3 h-1/4 '>
      <h1 className='text-2xl text-white font-bold my-2'>{post.title}</h1>
      <span className='text-white italic font-semibold my-2 line-clamp-3'>
        {post.content}
      </span>
    </section>
  );
};

export default PostBox;
