pipeline {
    agent any

    stages {
        stage('GIT PULL') {
            steps {
                //git sync
                git branch: 'main', credentialsId: 'db49c9e6-f6e7-43cb-b14d-94683abd2d7d', url:'https://github.com/ziiiromin/node-express-api.git'
            }
        }
        stage('CD') {
            steps {
                script {
                    def privateIP = '172.19.0.1'
                    def remote = [:]
                    remote.name = privateIP
                    remote.host = privateIP
                    remote.port = 22
                    remote.allowAnyHosts = true
                    withCredentials([sshUserPrivateKey(credentialsId: 'test-credential', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                        remote.user = userName
                        remote.identityFile = identity
                        stage("SSH Steps Rocks!") {
                            sshCommand remote: remote, command: 'cd /storage/data/jenkins/workspace/node-express-api && npm install && pm2 start ecosystem.config.js'
                        }
                    }
                }
            }
        }
    }
}