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
        SCANNER_HOME = tool 'sonar-token'
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
                        url: 'https://github.com/yellineedikalpana/Hotstar-devops.git',
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
        stage('TRIVY FS Scan') {
            steps { sh 'trivy fs . > trivyfs.txt' }
        }
        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {
                        sh 'docker build --no-cache --build-arg REACT_APP_TMDB=68f46e27dfbb53cb1f47418ffb3fb8a1 -t hotstar hotstar/'
                        sh 'docker tag hotstar yellineedidevops/hotstar:latest'
                        sh 'docker push yellineedidevops/hotstar:latest'
                    }
                }
            }
        }
        stage('TRIVY Image Scan') {
            steps { sh 'trivy image yellineedidevops/hotstar:latest > trivyimage.txt' }
        }
        stage('Deploy to EKS') {
            steps {
                script {
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
    }
}
