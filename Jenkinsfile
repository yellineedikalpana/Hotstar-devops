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
        TMDB_API_KEY = credentials('tmdb-api-key')
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout from Git') {
            steps {
                echo 'Cloning repository...'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/yellineedikalpana/Hotstar-devops.git',
                        credentialsId: 'github-token'
                    ]]
                ])
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh '''
                        ${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectName=netflix \
                        -Dsonar.projectKey=netflix
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                waitForQualityGate abortPipeline: true
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    cd hotstar
                    npm install
                '''
            }
        }

        stage('TRIVY FS Scan') {
            steps {
                sh 'trivy fs . > trivyfs.txt'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                    sh '''
                        docker build --no-cache \
                        --build-arg REACT_APP_TMDB=${TMDB_API_KEY} \
                        -t hotstar hotstar/

                        docker tag hotstar yellineedidevops/hotstar:latest
                        docker push yellineedidevops/hotstar:latest
                    '''
                }
            }
        }

        stage('TRIVY Image Scan') {
            steps {
                sh 'trivy image yellineedidevops/hotstar:latest > trivyimage.txt'
            }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws_access', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws_secret', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=us-east-1
                        aws eks update-kubeconfig --region us-east-1 --name cloudhotstar
                        kubectl apply -f deployment.yml
                        kubectl get pods
                        kubectl get svc
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}
