import gravatar from 'gravatar';

export function useGravatar() {
  const getGravatarUrl = (email: string, size: number = 44): string => {
    if (!email) {
      return '/images/user/owner.jpg'; // Sua imagem padrão
    }

    try {
      return gravatar.url(email, {
        s: size.toString(),     // Tamanho
        r: 'pg',               // Rating (conteúdo apropriado)
        d: 'identicon'         // Avatar gerado se não tiver foto
      });
    } catch (error) {
      console.warn('Erro ao gerar Gravatar:', error);
      return '/images/user/owner.jpg'; // Fallback
    }
  };

  return {
    getGravatarUrl
  };
}