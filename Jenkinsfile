#!groovy

pipeline {
    agent {
        label 'ubuntu-18.04'
    }
    stages {
        // pulls down locally the sources for the component
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('tools') {
            steps {
                def NODE_PATH = tool name: 'Node 8.11.2', type: 'nodejs'
                env.PATH = "${env.PATH}:${NODE_PATH}/bin"
                def YARN_PATH = tool name: 'yarn', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
                env.PATH = "${env.PATH}:${YARN_PATH}/bin"
            }
        }
        // Install the bower dependencies of the component
        stage('install dependencies') {
            steps {
                script {
                    sh "yarn"
                }
            }
        }
        // Lints, the component
        stage('checkstyle') {
            steps {
                script {
                    sh "yarn checkstyle || exit 0"
                    step([$class: 'CheckStylePublisher', pattern: 'eslint.xml'])
                }
            }
        }
        stage('documentation') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        build job: 'Kano/components-doc/master', parameters: [
                            text(name: 'repoUrl', value: 'https://github.com/KanoComponents/kwc-auth'),
                            text(name: 'componentName', value: 'kwc-auth')
                        ], wait: false
                    }
                }
            }
        }
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }
}
