const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
  target: 'web',
  mode: 'development',
  entry: {
    main: './src/index.jsx',
    about: './src/pages/About.jsx',
    home: './src/pages/Home.jsx',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Home',
      filename: 'index.html',
      template: path.resolve(__dirname, 'public', 'index.html'),
      favicon: './public/favicon.ico',
      inject: true,
    }),
    new StatoscopePlugin({
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ico|json|png|woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader?name=[name].[ext]'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['*', '.jsx', '.js', '.css'],
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    emitOnErrors: true,
    innerGraph: true,
    splitChunks: {
      minChunks: 2,
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  devServer: {
    static: [
      { directory: path.resolve(__dirname, 'public') },
      { directory: path.resolve(__dirname, 'dist') }],
    compress: true,
    open: true,
    hot: true,
    port: 8080,
    client: {
      progress: true,
    },
  },
};

module.exports = config;
