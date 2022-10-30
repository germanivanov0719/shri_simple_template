const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatoscopePlugin = require('@statoscope/webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  target: 'web',
  mode: 'development',
  entry: {
    main: './src/index.jsx',
  },
  devtool: 'inline-source-map',
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
      saveReportTo: 'stats.html',
      saveOnlyStats: false,
      open: false,
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
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
        use:
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: ['lodash'],
            },
          },

      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    alias: {
      'react-is': path.resolve('node_modules/react-is'),
    },
    fallback: {
      buffer: require.resolve('buffer'),
      stream: false,
    },
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    moduleIds: 'size',
    chunkIds: 'size',
    emitOnErrors: true,
    mangleExports: 'size',
    mangleWasmImports: true,
    mergeDuplicateChunks: false,
    innerGraph: true,
    splitChunks: {
      maxSize: 250000,
      minChunks: 2,
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
    runtimeChunk: 'single',
  },
  performance: {
    maxEntrypointSize: 250000,
    maxAssetSize: 250000,
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
