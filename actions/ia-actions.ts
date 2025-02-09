import { BlogPostContent, MatchDetail } from '@/types/types';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { createBlogPost } from '@/actions/blog-actions';
import { parseBlogPostContent } from '@/utils/postUtils';

const system =
  'Eres Carlitos, un escritor influenciado por Charles Bukowski. Escribes con metáforas crudas, ironía afilada y un humor ácido que no deja títere con cabeza. Tu trabajo es narrar el día a día del torneo de tenis entre amigos llamado ADP ATP, pero no te limitas a los partidos: también desmenuzas noticias, opinas sin filtro y escribes editoriales que combinan verdad y cinismo en partes iguales. Relatas los encuentros como si fueran duelos de gladiadores en el polvo de ladrillo, pero también destapas internas, analizas rachas y expones a los que se esconden en excusas baratas. No endulzas la realidad: si alguien juega como un tronco, lo dices; si otro deja el alma en la cancha, lo conviertes en leyenda. Tu misión es contar lo que pasa dentro y fuera de la cancha con detalle, intensidad y un estilo tan crudo como atrapante, capaz de hacer que incluso el más ajeno al tenis quiera seguir cada historia hasta el final, con un fernet en la mano y algo humeante en la parrilla.';

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
  } en ${matchDetails.location}. El ganador fue ${matchDetails.winner}.

  ${
    matchDetails.comments &&
    `Los comentarios del partidos son los siguientes: ${matchDetails.comments}`
  }
  
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
        : ''
    }
  ${matchDetails.player1.playStyle || matchDetails.player2.playStyle ? `- Estilos de juego:` : ''}
    ${
      matchDetails.player1.playStyle
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.playStyle}`
        : ''
    }
    ${
      matchDetails.player2.playStyle
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.playStyle}`
        : ''
    }

  ${
    matchDetails.player1.favoriteShot || matchDetails.player2.favoriteShot ? `- Tiro favorito:` : ''
  }
    ${
      matchDetails.player1.favoriteShot
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.favoriteShot}`
        : ''
    }
    ${
      matchDetails.player2.favoriteShot
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.favoriteShot}`
        : ''
    }

  ${matchDetails.player1.racket || matchDetails.player2.racket ? `- Raqueta:` : ''}
    ${
      matchDetails.player1.racket
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.racket}`
        : ''
    }
    ${
      matchDetails.player2.racket
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.racket}`
        : ''
    }

  ${matchDetails.player1.handedness || matchDetails.player2.handedness ? `- Mano:` : ''}
    ${
      matchDetails.player1.handedness
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.handedness}`
        : ''
    }
    ${
      matchDetails.player2.handedness
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.handedness}`
        : ''
    }

  ${matchDetails.player1.backhand || matchDetails.player2.backhand ? `- Revés:` : ''}
    ${
      matchDetails.player1.backhand
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.backhand}`
        : ''
    }
    ${
      matchDetails.player2.backhand
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.backhand}`
        : ''
    }

  ${matchDetails.player1.weight || matchDetails.player2.weight ? `- Peso:` : ''}
    ${
      matchDetails.player1.weight
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.weight}`
        : ''
    }
    ${
      matchDetails.player2.weight
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.weight}`
        : ''
    }

  ${matchDetails.player1.height || matchDetails.player2.height ? `- Altura:` : ''}
    ${
      matchDetails.player1.height
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.height}`
        : ''
    }
    ${
      matchDetails.player2.height
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.height}`
        : ''
    }

  ${
    matchDetails.player1.clothingBrand || matchDetails.player2.clothingBrand
      ? `- Marca de ropa:`
      : ''
  }
    ${
      matchDetails.player1.clothingBrand
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.clothingBrand}`
        : ''
    }
    ${
      matchDetails.player2.clothingBrand
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.clothingBrand}`
        : ''
    }

  ${
    matchDetails.player1.birthplace || matchDetails.player2.birthplace
      ? `- Lugar de nacimiento:`
      : ''
  }
    ${
      matchDetails.player1.birthplace
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.birthplace}`
        : ''
    }
    ${
      matchDetails.player2.birthplace
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.birthplace}`
        : ''
    }

  ${
    matchDetails.player1.favoritePlayer || matchDetails.player2.favoritePlayer
      ? `- Jugador favorito:`
      : ''
  }
    ${
      matchDetails.player1.favoritePlayer
        ? `- ${matchDetails.player1.name}: ${matchDetails.player1.favoritePlayer}`
        : ''
    }
    ${
      matchDetails.player2.favoritePlayer
        ? `- ${matchDetails.player2.name}: ${matchDetails.player2.favoritePlayer}`
        : ''
    }

  ${
    matchDetails.player1.rivalries || matchDetails.player2.rivalries
      ? `- Rivalidad: ${matchDetails.player1.rivalries || matchDetails.player2.rivalries}`
      : ''
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

export async function generateNewsContent(newsInput: string): Promise<BlogPostContent> {
  const prompt = `
    Escribe un post de blog en formato JSON basado en la siguiente noticia: ${newsInput}.
  
    El formato del JSON debe ser el siguiente:
    {
      "sections": [
        { "type": "heading", "level": 2, "content": "Título de la noticia" },
        { "type": "paragraph", "content": "Resumen de la noticia..." },
        { "type": "paragraph", "content": "Análisis de la noticia..." },
        { "type": "quote", "content": "Cita relevante de la noticia" },
        { "type": "paragraph", "content": "Contexto y significado de la noticia..." },
        { "type": "quote", "content": "Reflexión final sobre la noticia..." }
      ]
    }
  `;

  console.log('1 ===== prompt', prompt);
  try {
    const { text } = await generateText({
      model: google('gemini-2.0-flash-thinking-exp'),
      system: system,
      prompt: prompt,
    });

    console.log('2 ===== text ====>', text);
    const cleanText = text.replace(/```json|```/g, '').trim();
    console.log('3 ===== cleanText', cleanText);

    // Parsear el JSON limpio
    const rawContent = JSON.parse(cleanText);

    if (!rawContent || !Array.isArray(rawContent.sections)) {
      throw new Error('Formato de respuesta inválido');
    }

    // Crear el post en la base de datos
    const parsedContent = parseBlogPostContent(rawContent);
    console.log('4 ===== parsedContent', parsedContent);
    await createBlogPost(parsedContent);

    return rawContent;
  } catch (error) {
    console.error('Error generando contenido:', error);
    throw error;
  }
}
