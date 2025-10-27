import { forwardRef, RefObject } from 'react';
import type { Post } from '../hooks/useGetPosts/useGetPosts';

type PostListProps = {
  data: Post[];
  ref?: RefObject<HTMLDivElement>;
};

// Precisa ser forwardRef para receber o ref do pai (useRef está no List.tsx)
export const PostList = forwardRef<HTMLDivElement, PostListProps>(({ data }, ref) => {
  return (
    <div id='post-list' className='flex flex-col align-bottom overflow-y-scroll h-60'>
      {data.map((photo) => (
        <div
          key={photo.id}
          className='post-item'
          style={{ border: '1px solid white', margin: '8px', padding: '8px' }}
        >
          <h3>{photo.title}</h3>
          <p>{photo.body}</p>
        </div>
      ))}
      <div id='load-more' style={{ border: '2px solid red' }} ref={ref} />
    </div>
  );
});
