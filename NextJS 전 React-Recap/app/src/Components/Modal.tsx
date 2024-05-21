import { FormEventHandler } from 'react';
import { Post } from './PostBox';
type ModalProps = {
  addPost: (Post: Post) => void;
  handleModal: () => void;
};

const Modal = ({ addPost, handleModal }: ModalProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newPost: Post = {
      id: Math.random(),
      title: data.get('title') as string,
      content: data.get('content') as string,
    };

    addPost(newPost);
    handleModal();
  };

  return (
    <form
      action=''
      className='bg-purple-700 p-4 rounded shadow-lg w-2/5 '
      onSubmit={handleSubmit}
    >
      <div className='mb-4'>
        <label htmlFor='title' className='block text-white font-bold mb-2'>
          Title
        </label>
        <input
          type='text'
          id='title'
          name='title'
          className='border p-2 w-full'
        />
      </div>
      <div className='mb-4 w-full'>
        <label htmlFor='content' className='block text-white font-bold mb-2'>
          Content
        </label>
        <textarea
          name='content'
          id='content'
          className='border p-2 w-full'
        ></textarea>
      </div>
      <div className='mb-4 w-full flex justify-end'>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-500 text-white rounded mr-2'
        >
          Save
        </button>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded mr-2'
          type='button'
          onClick={handleModal}
        >
          Cancle
        </button>
      </div>
    </form>
  );
};

const ModalWrapper = ({ addPost, handleModal }: ModalProps) => {
  return (
    <section className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center '>
      <Modal addPost={addPost} handleModal={handleModal} />
    </section>
  );
};

export default ModalWrapper;
