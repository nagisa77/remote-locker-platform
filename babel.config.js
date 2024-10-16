module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/remote-locker-platform/' 
  : '/',
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
