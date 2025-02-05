import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Post } from '@/types/types';

const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card className='overflow-hidden'>
      <div className='relative w-full h-48'>
        <Image
          src={post.imageUrl || '/images/blog-post-0.jpg'}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <CardHeader>
        <p className='text-sm text-muted-foreground italic text-right'>
          {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <CardTitle className='text-xl font-mono line-clamp-2'>{post.title}</CardTitle>
      </CardHeader>
      <CardFooter className='justify-center'>
        <Button variant='default'>
          <Link href={`/blog/${post.slug}`}>Leer más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
