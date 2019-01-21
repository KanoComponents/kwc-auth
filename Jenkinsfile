#!groovy

@Library('kanolib') _

pipeline {
    agent {
        label 'ubuntu_18.04_with_docker'
    }
    post {
        always {
            junit allowEmptyResults: true, testResults: 'test-results.xml'
            step([$class: 'CheckStylePublisher', pattern: 'eslint.xml'])
        }
        regression {
            notify_culprits currentBuild.result
        }
    }
    stages {
        // pulls down locally the sources for the component
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        // Install the bower dependencies of the component
        stage('install dependencies') {
            steps {
                script {
                    docker.image('node:8-alpine').inside {
                        sh "yarn"
                    }
                }
            }
        }
        // Lints, the component
        stage('checkstyle') {
            steps {
                script {
                    docker.image('node:8-alpine').inside {
                        sh "yarn checkstyle-ci"
                    }
                }
            }
        }
        stage('test') {
            steps {
                script {
                    docker.image('kanocomputing/puppeteer').inside {
                        sh "yarn test-ci"
                    }
                }
            }
        }
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }
}
