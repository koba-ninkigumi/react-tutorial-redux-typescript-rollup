import typescript from 'rollup-plugin-typescript';
import babel   from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './public/src/main.js',
  dest: './public/dist/app.min.js',
  format: 'iife',
  sourceMap: './public/dist/app.min.js.map',
  moduleName: 'MyBundle',
  plugins: [
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel(),
    uglify()
  ],
  globals: {
    'react': 'React',
    'react-dom':'ReactDOM',
    'redux':'Redux',
    'react-redux':'ReactRedux',
    'redux-thunk':'ReduxThunk',
    'redux-logger':'reduxLogger'
  }
}
