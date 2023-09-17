const esbuild = require('esbuild')
const { sassPlugin } = require('esbuild-sass-plugin')

esbuild
  .context({
    entryPoints: ['src/frontend/index.tsx', 'src/frontend/style.scss'],
    bundle: true,
    sourcemap: true,
    external: ['*.woff'],
    outdir: './src/public',
    plugins: [sassPlugin({})],
    minify: process.argv.includes('--minify'),
  })
  .then((context) => {
    if (process.argv.includes('--watch')) {
      context.watch()
    } else {
      context.rebuild().then((result) => {
        context.dispose()
      })
    }
  })
  .catch(() => process.exit(1))
