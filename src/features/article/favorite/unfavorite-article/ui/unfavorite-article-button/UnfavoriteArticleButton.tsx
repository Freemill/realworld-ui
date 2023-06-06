import { ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FavoriteButton } from '~entities/article';
import { ArticleDto } from '~shared/api/realworld';
import { useMutationUnfavoriteArticle } from '../../model/unfavoriteArticle';

type UnfavoriteArticleButtonProps = {
  queryKey: unknown[];
  article: ArticleDto;
  title?: ReactNode;
  float?: 'none' | 'left' | 'right';
};

export function UnfavoriteArticleButton(props: UnfavoriteArticleButtonProps) {
  const { queryKey, article, title, float = 'none' } = props;

  const queryClient = useQueryClient();

  const unfavoriteArticle = useMutationUnfavoriteArticle(queryKey, queryClient);

  const handleUnfavorite = () => {
    const newArticle: ArticleDto = {
      ...article,
      favorited: false,
      favoritesCount: article.favoritesCount - 1,
    };
    unfavoriteArticle.mutate(newArticle);
  };

  return (
    <FavoriteButton
      favorited
      title={title}
      float={float}
      onClick={handleUnfavorite}
    />
  );
}