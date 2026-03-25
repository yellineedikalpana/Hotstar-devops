pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        skipDefaultCheckout()
        durabilityHint('PERFORMANCE_OPTIMIZED')
    }

    tools {
        jdk 'jdk17'
        nodejs 'node18'
    }

    environment {
        SCANNER_HOME = tool 'sonar-scanner'
    }

    stages {

        stage('Clean Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout from Git') {
            steps {
                echo "Cloning repo..."
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Naresh916/Hotstar-devops.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    echo "WORKSPACE CHECK:"
                    pwd
                    ls -la

                    echo "Installing npm deps..."
                    cd hotstar
                    npm install
                '''
            }
        }
    }
}
