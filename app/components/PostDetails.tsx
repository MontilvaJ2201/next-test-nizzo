import { Post } from './PostList';
import Image from 'next/image';

interface PostDetailsProps {
  post: Post;
  onBack: () => void;
  darkMode: boolean;
}

const PostDetails = ({ post, onBack, darkMode }: PostDetailsProps) => (
  <div className={`flex flex-col items-center p-8 rounded-md w-4/5 mx-auto ${darkMode ? 'bg-zinc-900' : 'bg-white'}`}>
    <div className={`flex flex-col justify-between items-center p-8 rounded-md ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className={`flex w-full font-bold mb-8 ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`}>
            <button 
              className='transform transition duration-500 ease-in-out hover:scale-90' 
              onClick={onBack}
            >
                ← Volver
            </button>
        </div>
      <h2 className={`text-2xl font-bold text-center mb-12 transform transition duration-500 ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`}>
        {post.title}
      </h2>
      <div className="flex flex-col md:flex-row items-center mt-4">
        <p className={`mb-4 md:mr-4 md:mb-0 transform transition duration-500 ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`}>
          {post.body}
        </p>
        <Image 
          src={post.imageUrl} 
          alt={post.title} 
          className="object-cover w-64 h-64 rounded-md" width={254} height={254} 
        />
      </div>
    </div>
  </div>
);

export default PostDetails;