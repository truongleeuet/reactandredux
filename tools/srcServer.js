import express from 'express';
import webpack  from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';

/*eslint-disable no-console */

const port = 3000;
const app = express();
const complier = webpack(config);

app.use(require('webpack-dev-middleware')(complier, {
  noInfo: true,
  publicpath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(complier));

app.get('*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
