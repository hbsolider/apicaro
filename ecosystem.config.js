module.exports = {
  apps: [
    {
      name: 'online-caro-server',
      script: './build/index.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
