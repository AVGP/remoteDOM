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
        },
        express: {
            server: {
                options: {
                    bases: ["./"]
                }
            }
        }
    });
    
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-express");
    grunt.loadNpmTasks("grunt-contrib-copy");  
    
    grunt.registerTask('server', ['express', 'express-keepalive']);        
};