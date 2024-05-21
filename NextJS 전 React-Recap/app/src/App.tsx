import Background from './Components/Background';
import Header from './Components/Header';
import HorizontalLine from './Components/HorizontalLine';
import Board from './Components/Board';
import { useCallback, useState } from 'react';
import { Post } from './Components/PostBox';
import ModalWrapper from './Components/Modal';
function App() {
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '첫 번째 포스트',
      content: '룰루랄라',
    },
    {
      id: 2,
      title: '두 번째 포스트',
      content: '룰루랄라',
    },
    {
      id: 3,
      title: '세 번째 포스트',
      content: '룰루랄라',
    },
    {
      id: 4,
      title: '네 번째 포스트',
      content: '룰루랄라',
    },
  ]);

  const addPost = (newPost: Post) => {
    setPosts((prevPosts: Post[]) => [...prevPosts, newPost]);
  };

  const handleModal = () => {
    setIsModelOpen((prev) => !prev);
  };

  return (
    <Background>
      <Header handleModal={handleModal} />
      <HorizontalLine />
      <Board posts={posts} />
      {isModalOpen && (
        <ModalWrapper addPost={addPost} handleModal={handleModal} />
      )}
    </Background>
  );
}

export default App;
