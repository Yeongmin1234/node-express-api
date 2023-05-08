module.exports = {
    apps: [{
        watch: true,
        name: 'index',
        script: './app.js',
        description: 'node-express',
        version: '1.0.0',
        namespace: 'mynamespace',
        // instances: 0,
        exec_mode: 'cluster'
    }]
}