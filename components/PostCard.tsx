import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/types';
import Link from 'next/link';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card key={post.id} className='rounded-none'>
      <CardHeader>
        <p className='text-sm text-muted-foreground italic text-right'>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <CardTitle className='text-xl font-mono h-16'>{post.title}</CardTitle>
      </CardHeader>
      <CardFooter className='justify-center'>
        <Button variant='link'>
          <Link href={`/blog/${post.id}`}>Leer más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
