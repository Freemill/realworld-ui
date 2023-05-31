import {
  articleApi,
  ArticlePreviewCard,
  ArticlesList,
  LoadMoreButton,
} from '~entities/article';
import {
  UnfavoriteArticleButton,
  FavoriteArticleButton,
} from '~features/article';

const queryKey = ['userfeed'];

export function UserFeedArticlesList() {
  const {
    data: articlesData,
    status: articlesStatus,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = articleApi.useUserFeedArticles(queryKey);

  return (
    <ArticlesList
      isLoading={articlesStatus === 'loading'}
      isError={articlesStatus === 'error'}
      isSuccess={articlesStatus === 'success'}
      hasNextPage={hasNextPage}
      infinityArticles={articlesData}
      renderArticles={(article) => (
        <ArticlePreviewCard
          key={article.slug}
          article={article}
          actionSlot={
            article.favorited ? (
              <UnfavoriteArticleButton queryKey={queryKey} article={article} />
            ) : (
              <FavoriteArticleButton queryKey={queryKey} article={article} />
            )
          }
        />
      )}
      nextPageAction={
        <LoadMoreButton
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      }
    />
  );
}
