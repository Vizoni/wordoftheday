import { useRef } from 'react';
import { PostList } from './components/PostList';
import { useGetPosts } from './hooks/useGetPosts/useGetPosts';

// ESSA PÁGINA FOI APENAS PARA ESTUDAR O USO DO INTERSECTION OBSERVER COM REFS
export const List = () => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const { posts } = useGetPosts({ ref: loadMoreRef });
  return (
    <main className='flex flex-col justify-end gap-4 h-full'>
      <h1>Lista: {posts.length} itens</h1>
      <PostList data={posts} ref={loadMoreRef} />
    </main>
  );
};
