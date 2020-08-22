// dev代理
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/website/api', {
    // target: 'http://47.104.164.78:8080/website/',
    target: 'http://website.ftms.devbmsoft.cn/',
    pathRewrite: { '^/website/api': '/website/api' },
    changeOrigin: true
  }));
  app.use(proxy('/website', {
    target: 'http://website.ftms.devbmsoft.cn/',
    pathRewrite: { '^/website': '/website' },
    changeOrigin: true
  }));
  app.use(proxy('/Website', {
    target: 'http://website.ftms.devbmsoft.cn/',
    pathRewrite: { '^/Website': '/Website' },
    changeOrigin: true
  }));
};

