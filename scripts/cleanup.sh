#!/bin/bash
# Destroy all AWS resources to avoid charges
set -e
echo "WARNING: This will destroy ALL ChatSphere AWS resources!"
read -p "Type 'yes' to confirm: " confirm
if [ "$confirm" != "yes" ]; then echo "Aborted."; exit 1; fi
cd terraform
terraform destroy -var-file=terraform.tfvars -auto-approve
echo "All resources destroyed."
