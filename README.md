# ChatSphere — Real-Time Chat Application with Microservices

> **DevOps Course Project** | AWS · Docker · Kubernetes · Jenkins · Terraform · Ansible

[![CI/CD](https://github.com/your-org/chatsphere/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/your-org/chatsphere/actions)

---

## What is ChatSphere?

ChatSphere is a **scalable, production-ready real-time messaging platform** built with a microservices architecture. It allows users to:
- Send and receive **instant messages** via WebSockets
- Share images and media in chat
- See **online/offline** status of contacts
- Update profile with avatar images via Cloudinary CDN

The entire platform is deployed on **AWS** using Infrastructure-as-Code (Terraform), configuration management (Ansible), container orchestration (Kubernetes on EKS), and a full CI/CD pipeline (Jenkins + GitHub Actions).

---

## Architecture Overview

```
Internet → CloudFront (CDN) → S3 (React Frontend)
                │
                ▼ API / WebSocket
          AWS ALB (Load Balancer)
                │
    ┌───────────┼───────────┐
    ▼           ▼           ▼
 Backend     Frontend    (Notification
 Service     Service      Service)
(EKS Pod)  (EKS Pod)    (EKS Pod)
    └───────────┼───────────┘
                ▼
         MongoDB Atlas (Cloud DB)
         Cloudinary   (Media CDN)

CI/CD: GitHub Push → Jenkins (EC2) → Docker Build → ECR → EKS Deploy
IaC:   Terraform (AWS infra) + Ansible (EC2 configuration)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, TailwindCSS, DaisyUI, Socket.io-client |
| **Backend** | Node.js 20, Express.js, Socket.io, Mongoose |
| **Database** | MongoDB Atlas (cloud managed) |
| **Media** | Cloudinary CDN |
| **Containers** | Docker, AWS ECR |
| **Orchestration** | Kubernetes 1.29 on AWS EKS |
| **CI/CD** | Jenkins (EC2), GitHub Actions |
| **IaC** | Terraform 1.7 |
| **Config Mgmt** | Ansible 2.16 |
| **Cloud** | AWS (EKS, EC2, S3, CloudFront, ECR, VPC, ALB) |

---

## Project Structure

```
chatsphere/
├── backend/               # Node.js + Express + Socket.io
│   ├── src/
│   │   ├── controllers/   # auth.controller.js, message.controller.js
│   │   ├── models/        # user.model.js, message.model.js
│   │   ├── routes/        # auth.route.js, message.route.js
│   │   ├── lib/           # db.js, socket.js, cloudinary.js, utils.js
│   │   ├── middleware/    # auth.middleware.js
│   │   └── index.js       # Entry point + health check
│   └── Dockerfile
├── frontend/              # React + Vite SPA
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar, ChatContainer, etc.
│   │   ├── pages/         # LoginPage, SignUpPage, HomePage, etc.
│   │   ├── store/         # Zustand state (useAuthStore, useChatStore)
│   │   └── index.css      # Dark glassmorphism design system
│   └── Dockerfile
├── k8s/                   # Kubernetes manifests
│   └── base/
│       ├── namespace.yaml
│       ├── configmap.yaml
│       ├── secret.yaml
│       ├── backend-deployment.yaml
│       ├── frontend-deployment.yaml
│       └── ingress.yaml
├── terraform/             # AWS Infrastructure as Code
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   ├── backend.tf         # S3 remote state
│   └── modules/
│       ├── vpc/           # VPC, subnets, IGW, NAT
│       ├── eks/           # EKS cluster + node group
│       ├── ecr/           # Docker image registries
│       ├── ec2/           # Jenkins server
│       └── s3/            # Frontend hosting + CloudFront
├── ansible/               # Server configuration management
│   ├── inventory/hosts.ini
│   ├── playbooks/
│   │   ├── site.yml
│   │   └── jenkins-setup.yml
│   └── roles/
│       ├── docker/        # Install Docker CE
│       ├── kubectl/       # Install kubectl + configure EKS
│       ├── jenkins/       # Install Jenkins + Java
│       └── security/      # UFW, fail2ban, SSH hardening
├── jenkins/Jenkinsfile    # Full CI/CD pipeline (10 stages)
├── .github/workflows/     # GitHub Actions CI/CD
├── docker-compose.yml     # Local development
└── scripts/
    ├── bootstrap-tfstate.sh   # Create S3 backend for Terraform
    ├── deploy.sh              # Full deployment automation
    └── cleanup.sh             # Destroy all AWS resources
```

---

## Quick Start — Local Development

### Prerequisites
- Node.js 20+, Docker Desktop, Git

### 1. Clone & Setup
```bash
git clone https://github.com/your-org/chatsphere.git
cd chatsphere
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI, JWT secret, Cloudinary keys
```

### 2. Run with Docker Compose
```bash
docker-compose up --build
```
- Frontend: http://localhost:5173
- Backend API: http://localhost:5001
- Via Nginx proxy: http://localhost:80

### 3. Run without Docker (direct)
```bash
# Terminal 1 — Backend
cd backend && npm install && npm run dev

# Terminal 2 — Frontend
cd frontend && npm install && npm run dev
```

---

## AWS Deployment (Production)

### Prerequisites
- AWS Account + IAM user with AdministratorAccess
- AWS CLI configured: `aws configure`
- Terraform 1.7+, kubectl, Ansible, Docker

### Step 1 — Bootstrap Terraform State
```bash
chmod +x scripts/bootstrap-tfstate.sh
./scripts/bootstrap-tfstate.sh
```

### Step 2 — Provision AWS Infrastructure
```bash
cd terraform
terraform init
terraform plan -var-file=terraform.tfvars
terraform apply -auto-approve
# Note the outputs: Jenkins IP, ECR URLs, CloudFront URL
```

### Step 3 — Configure Servers with Ansible
```bash
cd ansible
# Update inventory/hosts.ini with Jenkins EC2 IP from terraform output
ansible-playbook -i inventory/hosts.ini playbooks/site.yml
```

### Step 4 — Create Kubernetes Secrets
```bash
aws eks update-kubeconfig --name chatsphere-cluster --region ap-south-1
kubectl create secret generic chatsphere-secrets \
  --from-literal=MONGODB_URI="mongodb+srv://..." \
  --from-literal=JWT_SECRET="your-secret" \
  --from-literal=CLOUDINARY_CLOUD_NAME="your-cloud" \
  --from-literal=CLOUDINARY_API_KEY="your-key" \
  --from-literal=CLOUDINARY_API_SECRET="your-secret" \
  -n chatsphere
```

### Step 5 — Deploy via Jenkins
1. Access Jenkins: `http://<EC2_IP>:8080`
2. Create pipeline job pointing to this repo
3. Add credentials (ECR_REGISTRY, MONGODB_URI, JWT_SECRET, Cloudinary keys)
4. Push to `main` branch → Jenkins auto-builds and deploys

---

## Environment Variables

| Variable | Service | Description |
|---|---|---|
| `MONGODB_URI` | Backend | MongoDB Atlas connection string |
| `PORT` | Backend | Server port (default: 5001) |
| `JWT_SECRET` | Backend | JWT signing secret (min 32 chars) |
| `NODE_ENV` | Backend | `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Backend | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Backend | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Backend | Cloudinary API secret |

---

## Cleanup AWS Resources
```bash
./scripts/cleanup.sh
```
> ⚠️ This destroys ALL AWS resources. Use when done to avoid charges.

---

## DevOps Course Requirements ✅

| Requirement | Implementation |
|---|---|
| Web application with database | React + Node.js + MongoDB Atlas |
| Microservices architecture | Auth, Messaging services (separate concerns) |
| Docker containers | Multi-stage Dockerfiles for backend + frontend |
| Kubernetes (NOT Minikube) | AWS EKS with managed node groups |
| Terraform | Provisions VPC, EKS, ECR, EC2, S3, CloudFront |
| Ansible | Configures Jenkins EC2, installs Docker/kubectl |
| Jenkins CI/CD | 10-stage pipeline: test→build→push→deploy→verify |
| GitHub Actions | Parallel CI/CD workflow triggered on push |
| AWS deployment | ap-south-1 region, production-grade setup |
| WebSockets | Socket.io for real-time bidirectional messaging |

---

*ChatSphere — Built for DevOps Engineering Course*
