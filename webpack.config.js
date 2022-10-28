const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;

const config = {
  // target: 'web',
  mode: 'development',
  entry: {
    main: './src/index.jsx',
    about: './src/pages/About.jsx',
    home: './src/pages/Home.jsx',
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public', 'index.html'),
      favicon: './public/favicon.ico',
    }),
    new StatoscopePlugin({
      saveStatsTo: 'stats.json',
      saveOnlyStats: false,
      open: false,
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(ts|tsx)$/i,
      //   loader: 'ts-loader',
      //   exclude: '/node_modules/',
      // },
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
        test: /\.css$/i,
        loader: 'css-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.tsx', '.js', '.css'],
  },
  // @TODO optimizations
  // @TODO lodash treeshaking
  // @TODO chunk for lodash
  // @TODO chunk for runtime
  // @TODO fallback for crypto

  // Настройка сервера разработки
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};

module.exports = config;
