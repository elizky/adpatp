'use client';
import { useState, useEffect } from 'react';
import MatchForm from './forms/MatchForm';
import MatchesCards from './MatchesCards';
import RankingsTable from './RankingTable';
import { Match, Player } from '@/types/types';
import { getMatches, getPlayers } from '@/actions/data-actions';
import Loading from '@/app/loading';
import { useModal } from '@/lib/ModalContext';

interface HomeProps {
  isAdmin: boolean;
}

export default function HomeComponent({ isAdmin }: HomeProps) {
  const [players, setPlayers] = useState<Player[]>([]); // Asegúrate de definir bien el tipo de los jugadores
  const [matches, setMatches] = useState<Match[]>([]); // Asegúrate de definir bien el tipo de los partidos
  const [loading, setLoading] = useState(true);
  const { isOpen, closeModal, setIsOpen, matchData } = useModal();

  const fetchData = async () => {
    try {
      const playersData = await getPlayers(); // Usa tu función getPlayers
      setPlayers(playersData);

      const matchesData = await getMatches(); // Usa tu función getMatches
      setMatches(matchesData);
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

  console.log('matches', matches)

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
      </main>
    </div>
  );
}
