import { RefObject, useEffect, useState } from 'react';

export type UseGetPostsProps = {
  ref: RefObject<HTMLDivElement>;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const useGetPosts = ({ ref }: UseGetPostsProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_page=0&_limit=5');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const loadMoreElement = ref.current;
    if (!loadMoreElement) return;

    // const observerOptions = {
    //   root: loadMoreElement, // viewport = container
    //   // rootMargin: '100px 0px 100px 0px', // 100px antes e depois da dobra
    //   rootMargin: '0px', // 100px antes e depois da dobra
    //   threshold: 0.1, // qualquer parte visível
    // };

    const observer = new IntersectionObserver((entries) => {
      console.info('ENTRIES 0', entries[0]);
      if (entries[0].isIntersecting) {
        fetchMorePosts(currentPage);
      }
    });
    // }, observerOptions);

    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, []);

  const fetchMorePosts = async (page: number) => {
    setCurrentPage(page + 1);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${currentPage + 1}&_limit=5`
    );
    const data = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data]);
  };

  return {
    posts,
    fetchMorePosts,
  };
};
