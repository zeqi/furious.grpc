module.exports = function(grunt) {

  grunt.initConfig({
    mongodbCodeGen: {
        all: {
          options: {
            verbose: true,
            colors: true
          }
        },
        options: {
            version: 'v0.1.0',
            daoDir: './persistence/dao',
            modelDir: './persistence/model',
            routeDir: './routes',
            registerDir:'./routes/apiRegister',
            definitions: [
                            './persistence/codegen/dbdefinition/product.js',
                            './persistence/codegen/dbdefinition/merchant.js',
                            './persistence/codegen/dbdefinition/order.js',
                            './persistence/codegen/dbdefinition/group.js',
                            './persistence/codegen/dbdefinition/catalog.js',
                            './persistence/codegen/dbdefinition/shoppingcart.js',
                            './persistence/codegen/dbdefinition/tag.js',
                            './persistence/codegen/dbdefinition/area.js',
                            './persistence/codegen/dbdefinition/sysGroup.js',
                            './persistence/codegen/dbdefinition/userAccount.js',
                            './persistence/codegen/dbdefinition/activity.js',
                            './persistence/codegen/dbdefinition/hotspot.js',
                            './persistence/codegen/dbdefinition/counter.js',
                            './persistence/codegen/dbdefinition/activityTracking.js',
                            './persistence/codegen/dbdefinition/visitor.js',
                            './persistence/codegen/dbdefinition/device.js',
                            './persistence/codegen/dbdefinition/msgstore.js',
                            './persistence/codegen/dbdefinition/msgqueue.js',
                            './persistence/codegen/dbdefinition/demand.js',
                            './persistence/codegen/dbdefinition/favorite.js',
                            './persistence/codegen/dbdefinition/sdcatalog.js',
                            './persistence/codegen/dbdefinition/config.js',
                            './persistence/codegen/dbdefinition/buyer.js',
                            './persistence/codegen/dbdefinition/operationLog.js'
                         ],
            overwrite: true
        }
    },
    apidoc: {
     nonghe_data: {
       src: './routes',
       dest: './docs'
     } 
    }
  });

  grunt.loadTasks('./grunt/code-gen/tasks');
  grunt.loadNpmTasks('grunt-apidoc');
  grunt.registerTask('default', ['mongodbCodeGen']);
  grunt.registerTask('apidoc', ['apidoc']);

};

