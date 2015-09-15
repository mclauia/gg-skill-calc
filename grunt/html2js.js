module.exports = function(grunt, options) {
    return {
        main: {
            src: ['./app/**/*.tpl'],
            dest: './tmp/templates.js'
        },
        options: {
            base: 'app',
            module: 'app.templates',
            rename: function(name) {
                return 'views/' + name;
            }
        }
    }
}
