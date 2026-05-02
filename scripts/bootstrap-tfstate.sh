#!/bin/bash
# Run this ONCE before terraform init to create S3 backend for state storage
set -e

AWS_REGION="ap-south-1"
BUCKET_NAME="chatsphere-tfstate-bucket"
TABLE_NAME="chatsphere-tfstate-lock"

echo "Creating S3 bucket for Terraform state..."
aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION

aws s3api put-bucket-versioning \
  --bucket $BUCKET_NAME \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-encryption \
  --bucket $BUCKET_NAME \
  --server-side-encryption-configuration \
  '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

echo "Creating DynamoDB table for state locking..."
aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region $AWS_REGION

echo "Done! Now run: cd terraform && terraform init"
