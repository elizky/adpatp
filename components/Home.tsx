'use client';
import { useState, useEffect } from 'react';
import MatchForm from './forms/MatchForm';
import MatchesCards from './MatchesCards';
import RankingsTable from './RankingTable';
import { Match, Player, Post } from '@/types/types';
import { getMatches, getPlayers } from '@/actions/data-actions';
import Loading from '@/app/loading';
import { useModal } from '@/lib/ModalContext';
import { getBlogPosts } from '@/actions/blog-actions';
import PostCard from './PostCard';

interface HomeProps {
  isAdmin: boolean;
}

export default function HomeComponent({ isAdmin }: HomeProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, closeModal, setIsOpen, matchData } = useModal();

  const fetchData = async () => {
    try {
      const playersData = await getPlayers();
      setPlayers(playersData);

      const matchesData = await getMatches();
      setMatches(matchesData);

      const postsData = await getBlogPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-6 py-6'>
        {isAdmin && (
          <MatchForm
            players={players}
            fetchData={fetchData}
            match={matchData}
            isOpen={isOpen}
            closeModal={closeModal}
            setIsOpen={setIsOpen}
          />
        )}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className={`lg:col-span-2 ${matches.length === 0 && 'lg:col-span-3'}`}>
            <RankingsTable players={players} />
          </div>
          <div>{matches.length > 0 && <MatchesCards matches={matches} isAdmin={isAdmin} />}</div>
        </div>
        {posts.length > 0 && (
          <div className='mt-6'>
            <div className='flex items-center justify-between p-4 pl-0'>
              <h2 className='text-lg font-bold font-mono'> Ultimas Noticias</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
              {posts.slice(-5).map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
