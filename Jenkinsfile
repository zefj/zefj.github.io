#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node:8-alpine'
        }
    }

    stages {
        stage('Install') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
        stage('Lint') {
            steps {
                echo 'Linting...'
                sh 'npm run eslint'
            }
        }
    }
}