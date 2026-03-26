# Hotstar-devops
Deployed a production grade application

Project Summary:
Implemented an end‑to‑end DevSecOps pipeline to automate the build, security scanning, containerization, deployment, and monitoring of a React‑based Netflix/Hotstar‑style web application. Built a fully automated workflow integrating CI/CD, security tools, Docker image management, Kubernetes deployment, and observability.
Key Highlights:


Source Code Management & CI/CD:
Developed a complete pipeline in Jenkins to automate code checkout, dependency installation, SonarQube code analysis, quality gates, Docker build & push, security scans, and deployment.


Security Integration (DevSecOps):
Added SonarQube, OWASP Dependency Check, and Trivy to scan code quality, vulnerabilities, dependencies, and container images as part of CI/CD.


Containerization & Image Management:
Built production‑grade Docker images for the React application using multi‑stage builds and stored them in DockerHub for versioned deployment.


Kubernetes Deployment (EKS):
Deployed the application on Amazon EKS using Kubernetes manifests/Helm charts. Implemented automated sync and GitOps deployment flows using ArgoCD.


Cloud Infrastructure:
Hosted CI/CD and monitoring stack on AWS (EC2, EKS). Managed networking, load balancers, and scaling for application workloads.


Monitoring & Observability:
Configured Prometheus + Grafana dashboards to track application and system metrics. Enabled Node Exporter for cluster‑level monitoring.


Notifications & Reporting:
Integrated Jenkins email notifications and quality gate checks for build success/failure reporting.
