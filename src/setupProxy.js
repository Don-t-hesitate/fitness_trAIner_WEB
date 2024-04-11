const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',  // 백엔드 서버 URL로 변경해주세요.
      changeOrigin: true,
    })
  );
};