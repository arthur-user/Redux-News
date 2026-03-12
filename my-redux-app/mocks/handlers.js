
/*MSW Request Handlers: Functions that intercept network requests (like fetch or axios calls) and 
return a "mocked" response as if they were a real backend server; different from React event
handlers, which are functions like onClick, onChange that respond to user interactions on the UI*/

import { http, HttpResponse, delay } from 'msw';
import articlesData from './articles.json';
import commentsData from './comments.json';

const userComments = {};

export const handlers = [
  // GET /api/articles
  http.get('/api/articles', async () => {
    await delay(500);

    return HttpResponse.json(
      articlesData.map((article) => ({
        id: article.id,
        title: article.title,
        preview: article.preview,
        image: article.image,
      }))
    );
  }),

  // GET /api/articles/:articleId
  http.get('/api/articles/:articleId', async ({ params }) => {
    await delay(500);

    const { articleId } = params;

    return HttpResponse.json(
      articlesData.find((article) => article.id === parseInt(articleId, 10))
    );
  }),

  // GET /api/articles/:articleId/comments
  http.get('/api/articles/:articleId/comments', async ({ params }) => {
    await delay(500);

    const { articleId } = params;
    const userCommentsForArticle = userComments[articleId] || [];

    return HttpResponse.json({
      articleId: parseInt(articleId, 10),
      comments: commentsData
        .filter((comment) => comment.articleId === parseInt(articleId, 10))
        .concat(userCommentsForArticle),
    });
  }),

  // POST /api/articles/:articleId/comments
  http.post('/api/articles/:articleId/comments', async ({ params, request }) => {
    await delay(500);

    const { articleId } = params;
    const body = await request.json();

    const commentResponse = {
      id: commentsData.length,
      articleId: parseInt(articleId, 10),
      text: body.comment,
    };

    if (userComments[articleId]) {
      userComments[articleId].push(commentResponse);
    } else {
      userComments[articleId] = [commentResponse];
    }

    return HttpResponse.json(commentResponse);
  }),
];
