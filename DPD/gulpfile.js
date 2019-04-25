var gulpfile = require('gulp');

var connect = require('gulp-connect');
var cors = require('cors');

/////////////// End CSP Prod scripts

gulpfile.task('connect-server-start', function (done) {
    connect.server({
        root: "drug",
        // host:"127.0.0.1",
        port: 2121,
        middleware: function() {
            return [cors()];
        },
        livereload: true
    });
    done();
});
