pipeline {
    agent any
    options {
        parallelsAlwaysFailFast()
    }
    stages {
        stage('GIT PULL') {
            steps {
                //git sync
                git branch: 'master', credentialsId: 'db49c9e6-f6e7-43cb-b14d-94683abd2d7d', url:'https://bitbucket.org/fp-project/fp_git.git'
            }
        }
        stage('GIT PULL') {
            steps {
                //s3 sync
                sh(encoding: 'UTF-8', returnStdout: true, script: 'aws s3 sync ./ s3:/// ')
            }
        }
        stage('CD') {
            steps {
                script {
                    def parallelScripts = [:]
                    def output = sh(encoding: 'UTF-8', returnStdout: true, script: 'aws elbv2 describe-target-health --region ap-northeast-2 --target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:249395288509:targetgroup/lmpay-group/bf233f24226187be  --query \'TargetHealthDescriptions[*].[Target.Id, TargetHealth.State]\' --output text | grep healthy | awk \'{print $1}\' ')
                    def output_arr = output.split('\n')

                    output_arr.each { e ->
                        parallelScripts[e] = {
                            stage("CD_${e.replace('i-','')}") {
                                def privateIP = sh(encoding: 'UTF-8', returnStdout: true, script: "aws ec2 describe-instances --region ap-northeast-2 --filters Name=instance-state-name,Values=running --instance-ids ${e} --query \'Reservations[*].Instances[*].PrivateIpAddress\' --output text")
                                def remote = [:]
                                remote.name = e
                                remote.host = privateIP
                                remote.port = 22
                                remote.allowAnyHosts = true
                                withCredentials([sshUserPrivateKey(credentialsId: 'aws_deploy_test', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName')]) {
                                    remote.user = userName
                                    remote.identityFile = identity

                                    stage("SSH Steps Rocks!") {
                                        //s3 sync 한걸 각 서버에서 가져오고 추가 명령어 실행
                                        def cmdStr = '''
                                            aws s3 sync s3://asadfhkjashdfkjh ./

                                            pm2 reload server
                                        '''
                                        sshCommand remote: remote, command: cmdStr

                                    }
                                }

                            }
                        }
                    }

                    parallel parallelScripts
                }
            }
        }

    }
}