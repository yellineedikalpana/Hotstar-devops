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

        stage('Install Dependencies') {
            steps { sh 'npm install' }
        }

        stage('TRIVY FS Scan') {
            steps { sh 'trivy fs . > trivyfs.txt' }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', url: 'https://index.docker.io/v1/') {

                        sh 'docker build --build-arg TMDB_V3_API_KEY=68f46e27dfbb53cb1f47418ffb3fb8a1 -t hotstar .'
                        sh 'docker tag hotstar naresh9163/hotstar:latest'
                        sh 'docker push naresh9163/hotstar:latest'

                    }
                }
            }
        }

        stage('TRIVY Image Scan') {
            steps { sh 'trivy image naresh9163/hotstar:latest > trivyimage.txt' }
        }

        stage('Deploy to EKS') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws-access', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    sh '''
                        export AWS_DEFAULT_REGION=ap-south-1
                        aws eks update-kubeconfig --region ap-south-1 --name cloudhotstar
                        kubectl apply -f deployment.yml
                        kubectl get pods
                        kubectl get svc
                    '''
                }
            }
        }

    }
}
