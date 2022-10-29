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
      template: path.resolve(__dirname, './index.html'),
      favicon: './public/favicon.ico',
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
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
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
        test: /\.css$/i,
        loader: 'css-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.tsx', '.js', '.css', '.ico'],
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    moduleIds: 'deterministic',
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
    static: { directory: path.join(__dirname, 'public') },
    // open: true,
    compress: true,
    hot: true,
    port: 8080,
    client: {
      progress: true,
    },
  },
};

module.exports = config;
