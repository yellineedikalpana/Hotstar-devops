pipeline {
    agent any

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
                git(
                    branch: 'main',
                    credentialsId: 'github-token',
                    url: 'https://github.com/Naresh916/Hotstar-devops.git'
                )
            }
        }

        stage('Debug Workspace') {
            steps {
                echo "===== WORKSPACE PATH ====="
                sh 'pwd'

                echo "===== ROOT FILES ====="
                sh 'ls -la'

                echo "===== hotstar FOLDER FILES ====="
                sh 'ls -la hotstar'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Running npm install..."
                sh '''
                    cd hotstar
                    npm install
                '''
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=hotstar \
                        -Dsonar.projectKey=hotstar \
                        -Dsonar.sources=hotstar
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script { waitForQualityGate abortPipeline: false }
            }
        }

        stage('TRIVY FS Scan') {
            steps { sh 'trivy fs . > trivyfs.txt' }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                        sh 'docker build --build-arg TMDB_V3_API_KEY=68f46e27dfbb53cb1f47418ffb3fb8a1 -t hotstar hotstar/'
