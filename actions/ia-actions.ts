import { BlogPostContent, MatchDetail } from '@/types/types';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const system =
  'Eres un escritor parecido a Charles Bukowsky. Escribes con metaforas y analogias crudas, irónicas e incluso divertidas. Estas a cargo de escribir crónicas sobre los partidos de un torneo de tenis entre amigos llamado ATP ADP ';

export async function generateBlogPostContent(matchDetails: MatchDetail): Promise<BlogPostContent> {
  const prompt = `
    Escribe un post de blog en formato JSON sobre el siguiente partido de tenis. El partido fue entre ${
      matchDetails.player1.name
    } (ranking: ${matchDetails.player1.ranking}) y ${matchDetails.player2.name} (ranking: ${
    matchDetails.player2.ranking
  }), con un resultado final de ${matchDetails.player1Games.join('-')} (${
    matchDetails.player1.name
  }) vs ${matchDetails.player2Games.join('-')} (${matchDetails.player2.name}), jugado el ${
    matchDetails.date
  } en ${matchDetails.location || 'ubicación no especificada'}. El ganador fue ${
    matchDetails.winner
  }.
  
  Detalles adicionales:
  - Estadísticas clave:
    - Sets ganados: ${matchDetails.setsWonByPlayer1} (${matchDetails.player1.name}) vs ${
    matchDetails.setsWonByPlayer2
  } (${matchDetails.player2.name})
    - Juegos totales: ${matchDetails.totalGamesPlayer1} (${matchDetails.player1.name}) vs ${
    matchDetails.totalGamesPlayer2
  } (${matchDetails.player2.name})
    - Tie-break: ${
      matchDetails.tiebreakWonByPlayer
        ? `Ganado por ${
            matchDetails.tiebreakWonByPlayer === 1
              ? matchDetails.player1.name
              : matchDetails.player2.name
          }`
        : 'No hubo tie-break'
    }
  - Estilos de juego:
    - ${matchDetails.player1.name}: ${matchDetails.player1.playStyle || 'Estilo no especificado'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.playStyle || 'Estilo no especificado'}
  - Tiro favorito:
    - ${matchDetails.player1.name}: ${
    matchDetails.player1.favoriteShot || 'Tiro favorito no especificado'
  }
    - ${matchDetails.player2.name}: ${
    matchDetails.player2.favoriteShot || 'Tiro favorito no especificado'
  }
  - Raqueta:
    - ${matchDetails.player1.name}: ${matchDetails.player1.racket || 'Raqueta no especificada'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.racket || 'Raqueta no especificada'}
  - Mano:
    - ${matchDetails.player1.name}: ${matchDetails.player1.handedness || 'Mano no especificada'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.handedness || 'Mano no especificada'}
  - Revés:
    - ${matchDetails.player1.name}: ${matchDetails.player1.backhand || 'Reves no especificado'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.backhand || 'Reves no especificado'}
  - Peso:
    - ${matchDetails.player1.name}: ${matchDetails.player1.weight || 'Peso no especificado'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.weight || 'Peso no especificado'}
  - Altura:
    - ${matchDetails.player1.name}: ${matchDetails.player1.height || 'Altura no especificada'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.height || 'Altura no especificada'}
  - Marca de ropa que lo viste:
    - ${matchDetails.player1.name}: ${matchDetails.player1.clothingBrand || 'Marca no especificada'}
    - ${matchDetails.player2.name}: ${matchDetails.player2.clothingBrand || 'Marca no especificada'}
  - Lugar de nacimiento del jugador:
    - ${matchDetails.player1.name}: ${
    matchDetails.player1.birthplace || 'Lugar de nacimiento no especificado'
  }
    - ${matchDetails.player2.name}: ${
    matchDetails.player2.birthplace || 'Lugar de nacimiento no especificado'
  }
  - Jugador Favorito:
    - ${matchDetails.player1.name}: ${
    matchDetails.player1.favoritePlayer || 'Jugador favorito no especificada'
  }
    - ${matchDetails.player2.name}: ${
    matchDetails.player2.favoritePlayer || 'Jugador favorito no especificada'
  }
  
  - Rivalidad: ${
    matchDetails.player1.rivalries || matchDetails.player2.rivalries
      ? `Notas sobre rivalidades: ${
          matchDetails.player1.rivalries || matchDetails.player2.rivalries
        }`
      : 'No hay notas sobre rivalidades'
  }
  
  El formato del JSON debe ser el siguiente:
  {
    "sections": [
      { "type": "heading", "level": 2, "content": "Título del partido" },
      { "type": "paragraph", "content": "Resumen del partido..." },
      { "type": "paragraph", "content": "Análisis del juego y momentos clave..." },
      { "type": "quote", "content": "Cita memorable del partido" },
      { "type": "paragraph", "content": "Contexto y significado del partido..." }
      { "type": "quote", "content": "Reflexión final sobre el partido..." }
    ]
  }
  `;

  console.log('prompt', prompt);
  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash-thinking-exp'),
      system: system,
      prompt: prompt,
    });

    console.log('text ====>', text);
    const cleanText = text.replace(/```json|```/g, '').trim();

    // Parsear el JSON limpio
    const rawContent = JSON.parse(cleanText);

    if (!rawContent || !Array.isArray(rawContent.sections)) {
      throw new Error('Formato de respuesta inválido');
    }

    return rawContent;
  } catch (error) {
    console.error('Error generando contenido:', error);
    return {
      sections: [
        { type: 'heading', level: 2, content: 'Error al generar la noticia' },
        {
          type: 'paragraph',
          content: 'No se pudo generar la noticia del partido. Intenta de nuevo más tarde.',
        },
      ],
    };
  }
}
