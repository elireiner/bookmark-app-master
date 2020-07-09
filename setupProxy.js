const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://thinkful-list-api.herokuapp.com/v3/bookmarks/',
      changeOrigin: true,
    })
  );
}