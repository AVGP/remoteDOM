module.exports = function(grunt) {
    
    grunt.initConfig({
        browserify: {
            "dist/remote-dom.js": ["src/*.js"]
        },
        copy: {
            css: {
                files: [
                    {
                        expand: true,
                        src: ["src/remote-dom.css"],
                        dest: "dist/",
                        flatten: true,
                    }
                ]
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-copy");    
};