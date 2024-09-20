import path from 'path'


export default {
    mode: 'development',
    entry : {
        maps: './src/js/maps.js',
        addImage: './src/js/addImage.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}