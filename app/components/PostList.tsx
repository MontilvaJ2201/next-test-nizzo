"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import PostDetails from './PostDetails';
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md';

// Estructura del post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  imageUrl: string;
}

// Se muestra la lista de posts con un limite de 3 post por pagina
const PostList = ({ initialPosts = [] }: { initialPosts?: Post[] }) => {
  // estados del componente
  const [posts, setPosts] = useState<Post[]>(initialPosts); // Se almacenan los post
  const [page, setPage] = useState(1); // Se almacenan la página actual
  const [pageHistory, setPageHistory] = useState<number[]>([]); // Se almacena el historial de páginas visualizadas
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Almacena el post seleccionado
  const [darkMode, setDarkMode] = useState(false);
  // Hook useEffect para obtener datos de la API
  useEffect(() => {
    const fetchPosts = async () => {
      if (!pageHistory.includes(page)) {
        // Realiza la petición a la API
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=3`);
        const postsWithImages = res.data.map((post: Post, index: number) => {
          return { ...post, imageUrl: `https://picsum.photos/seed/${post.id + Date.now() + index}/200` };
        });
        setPosts(oldPosts => [...oldPosts, ...postsWithImages]);
      }
    };

    fetchPosts();
  }, [page]);
  // Función para cargar 3 nuevos posts
  const loadMore = () => {
    setPageHistory([...pageHistory, page]);
    setPage(page + 1);
  };
  // Función para volver a los 3 previos posts visualizados
  const loadPrevious = () => {
    const newPageHistory = [...pageHistory];
    newPageHistory.pop();
    setPageHistory(newPageHistory);
    setPage(page - 1);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${darkMode ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className="space-y-4">
        <div className="flex justify-center w-full">
          <h1 
            className= {`text-2xl font-bold transform transition duration-500 pr-4 ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`}>
              {selectedPost ? 'Detalles' : 'Blog - Posts'}
          </h1>
          <button 
            className= {`text-[32px] transform transition duration-500 ease-in-out ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`} 
            onClick={() => setDarkMode(!darkMode)}>{darkMode ? <MdDarkMode /> : <MdOutlineDarkMode />}
          </button>
        </div>
        {/* Condicional ?: se renderiza el componente PostDetails ::Se renderizara el siguiente bloque de codigo */}
        {selectedPost 
        ? 
        (
          <PostDetails post={selectedPost} onBack={() => setSelectedPost(null)} darkMode={darkMode} />
        ) 
        : 
        (
          <>
            {posts && posts.slice((page - 1) * 3, page * 3).map((post: Post) => (
              <div 
                key={post.id} 
                className= {`flex justify-between items-center p-4 rounded-md cursor-pointer transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-lg ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}
                onClick={() => setSelectedPost(post)}
              >
                <div className="w-1/2">
                  <h2 className= {`text-xl font-bold text-center transform transition duration-500 ${darkMode ? 'text-gray-200' : 'text-zinc-900'}`}>
                    {post.title}
                  </h2>
                </div>
                <div className="ml-4">
                  <Image 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="object-cover w-32 h-32 rounded-md" width={128} height={128} 
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center space-x-4">
              <button
                className={`mt-4 px-4 py-2 flex justify-center ${pageHistory.length > 0 ? 'bg-blue-400 text-white hover:bg-blue-700 transition duration-200 ease-in-out' : 'bg-blue-200 text-gray-400'} rounded`}
                onClick={loadPrevious}
                disabled={pageHistory.length === 0}
              >
                Prev
              </button>
              <button
                className="mt-4 px-4 py-2 flex justify-center bg-blue-400 text-white hover:bg-blue-700 transition duration-200 ease-in-out rounded"
                onClick={loadMore}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostList;