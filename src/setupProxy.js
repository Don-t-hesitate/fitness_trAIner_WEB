const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // '/api' 경로로 들어오는 요청에 대해 프록시 미들웨어 적용
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001', // 프록시 요청을 전달할 백엔드 서버 URL
      changeOrigin: true, // 대상 서버의 도메인을 프록시 요청의 호스트 헤더로 변경
    })
  );
};