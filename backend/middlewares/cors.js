const allowedCors = [
  'https://davidthebest.nomoredomainsicu.ru',
  'http://davidthebest.nomoredomainsicu.ru',
  'https://api.davidthebest.nomoredomainsicu.ru/users/me',
  'https://api.davidthebest.nomoredomainsicu.ru/cards',
  'https://api.davidthebest.nomoredomainsicu.ru/signup',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'https://158.160.72.189',
  'http://158.160.72.189',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};
