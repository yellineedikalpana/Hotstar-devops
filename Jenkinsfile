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
                git branch: 'main',
                    credentialsId: 'github-token',
                    url: 'https://github.com/Naresh916/Hotstar-devops.git'
            }
        }

        /* ------------------------------------------
           DEBUG STAGE ADDED TO CHECK FOLDER STRUCTURE
           ------------------------------------------ */
        stage('Debug Workspace') {
            steps {
                echo "Showing workspace structure..."
                sh 'pwd'
                sh 'ls -la'
                sh 'ls -R'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        $SCANNER_HOME/bin/sonar-scanner \
                        -Dsonar.projectName=hotstar \
                        -Dsonar.projectKey=hotstar
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script { waitForQualityGate abortPipeline: false }
            }
        }

        /* ------------------------------------------
           TODO: UPDATE THIS STAGE AFTER I SEE DEBUG OUTPUT
           ------------------------------------------ */
        stage('Install Dependencies') {
            steps {
                // TEMPORARY — we will update path after seeing Debug output
                sh 'npm install'
            }
        }

        stage('TRIVY FS Scan') {
            steps { sh 'trivy fs . > trivyfs.txt' }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {


