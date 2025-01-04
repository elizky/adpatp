import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { CircleHelp } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export default function RulesModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon'>
          <CircleHelp />
        </Button>
      </DialogTrigger>
      <DialogContent className='w-10/12 h-5/6 sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='font-mono'>Reglas</DialogTitle>
          <DialogDescription>Lee atentamente las reglas asi no te escritorean </DialogDescription>
        </DialogHeader>
        <ScrollArea>
          <ul className=' space-y-6'>
            <li>
              <strong className='font-mono'>Formato de partidos</strong>
              <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                <li>Los partidos se juegan al mejor de 3 sets.</li>
                <li>
                  En caso de empate (1-1), el último set se define con un super tiebreak a 10
                  puntos.
                </li>
              </ul>
            </li>
            <li>
              <strong className='font-mono'>Elección de superficie</strong>
              <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                <li>
                  El jugador desafiado tiene el derecho de elegir la superficie donde se jugará el
                  partido.
                </li>
              </ul>
            </li>
            <li>
              <strong className='font-mono'>Desafíos</strong>
              <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                <li>
                  Puedes desafiar a jugadores que estén hasta dos posiciones por encima en el
                  ranking.
                </li>
                <li>
                  Si ganas el partido, ocuparás la posición del desafiado, desplazándolo hacia
                  abajo.
                </li>
              </ul>
            </li>
            <li>
              <strong className='font-mono'>Prioridad de desafíos</strong>
              <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                <li>
                  Si un jugador recibe un desafío y, a la vez, desafía a otro, tiene prioridad el
                  partido donde estén involucrados los jugadores con mayor posición en el ranking.
                </li>
              </ul>
            </li>
            <li>
              <strong className='font-mono'>Competencias especiales</strong>
              <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                <li>
                  Copa Davis (mitad de año):
                  <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                    <li>
                      Se formarán equipos basados en el ranking, enfrentándose en formato por
                      parejas.
                    </li>
                  </ul>
                </li>
                <li>
                  Masters (fin de año):
                  <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                    <li>Los 8 mejores jugadores disputarán un torneo final:</li>
                    <li>Dos grupos de 4 jugadores.</li>
                    <li>Los dos mejores de cada grupo avanzan a las semifinales.</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
