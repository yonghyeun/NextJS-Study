const Header = ({ handleModal }: { handleModal: () => void }) => {
  return (
    <section className='flex justify-between'>
      <h1 className='text-5xl font-bold text-white italic underline'>
        React Post
      </h1>
      <button
        className='px-4 py-2 bg-blue-500 hover:bg-blue-700 font-bold text-white rounded transition-colors border-none'
        onClick={handleModal}
      >
        New Post
      </button>
    </section>
  );
};

export default Header;
