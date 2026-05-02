#!/bin/bash
# Full deployment script: Terraform → Ansible → K8s
set -e

echo "=== ChatSphere Deployment Script ==="
echo "Step 1: Provisioning AWS infrastructure with Terraform..."
cd terraform
terraform init
terraform plan -var-file=terraform.tfvars -out=tfplan
terraform apply tfplan

JENKINS_IP=$(terraform output -raw jenkins_public_ip)
EKS_CLUSTER=$(terraform output -raw eks_cluster_name)
echo "Jenkins IP: $JENKINS_IP"
echo "EKS Cluster: $EKS_CLUSTER"

echo "Step 2: Configuring servers with Ansible..."
cd ../ansible
sed -i "s/REPLACE_WITH_EC2_PUBLIC_IP/$JENKINS_IP/" inventory/hosts.ini
ansible-playbook -i inventory/hosts.ini playbooks/site.yml

echo "Step 3: Configuring kubectl for EKS..."
aws eks update-kubeconfig --name $EKS_CLUSTER --region ap-south-1

echo "Step 4: Deploying Kubernetes manifests..."
kubectl apply -f ../k8s/base/namespace.yaml
kubectl apply -f ../k8s/base/configmap.yaml
echo "Remember to apply secrets manually: kubectl apply -f k8s/base/secret.yaml"

echo "=== Deployment Complete ==="
echo "Jenkins UI: http://$JENKINS_IP:8080"
