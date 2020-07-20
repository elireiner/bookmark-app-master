const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'https://warm-refuge-96202.herokuapp.com/api/bookmarks/',
      changeOrigin: true,
    })
  );
}