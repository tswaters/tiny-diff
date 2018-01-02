
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

const config = (browser, minify) => {

  const plugins = [
    babel({
      presets: [
        ['@babel/preset-env', {
          loose: true,
          modules: false,
          targets: browser
            ? {browsers: ['ie >= 8']}
            : {node: '4'}
        }]
      ]
    })
  ]

  if (minify) {
    plugins.push(uglify())
  }

  return {
    input: './src/tiny-diff.js',
    output: browser ? {
      file: `dist/tiny-diff.umd${minify ? '.min' : ''}.js`,
      name: 'tinyDiff',
      format: 'umd'
    } : [{
      file: './dist/tiny-diff.mjs',
      format: 'es'
    }, {
      file: './dist/tiny-diff.js',
      format: 'cjs'
    }],
    plugins
  }

}

export default [
  config(true, false),  // browser.unmin
  config(true, true),   // browser.min
  config(false)         // nodejs (es, cjs)
]
