terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_key_pair" "chatsphere" {
  key_name   = "chatsphere-key"
  public_key = file("${path.module}/chatsphere-key.pub")
}

resource "aws_security_group" "chatsphere" {
  name        = "chatsphere-sg"
  description = "ChatSphere security group"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "SSH"
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }
  ingress {
    from_port   = 5001
    to_port     = 5001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Backend API"
  }
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Jenkins"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "chatsphere-sg" }
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "chatsphere" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.chatsphere.key_name
  vpc_security_group_ids      = [aws_security_group.chatsphere.id]
  associate_public_ip_address = true

  root_block_device {
    volume_size = 20
    volume_type = "gp2"
  }

  tags = { Name = "chatsphere-server" }
}

resource "random_id" "suffix" {
  byte_length = 4
}

resource "aws_s3_bucket" "frontend" {
  bucket        = "chatsphere-frontend-${random_id.suffix.hex}"
  force_destroy = true
  tags          = { Name = "chatsphere-frontend" }
}

resource "aws_s3_bucket_website_configuration" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  index_document { suffix = "index.html" }
  error_document { key    = "index.html" }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket                  = aws_s3_bucket.frontend.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = "*"
      Action    = "s3:GetObject"
      Resource  = "${aws_s3_bucket.frontend.arn}/*"
    }]
  })
  depends_on = [aws_s3_bucket_public_access_block.frontend]
}

output "ec2_public_ip" {
  value       = aws_instance.chatsphere.public_ip
  description = "EC2 Public IP"
}

output "s3_bucket_name" {
  value       = aws_s3_bucket.frontend.bucket
  description = "S3 bucket name"
}

output "s3_website_url" {
  value       = aws_s3_bucket_website_configuration.frontend.website_endpoint
  description = "Frontend URL"
}

output "ssh_command" {
  value       = "ssh -i chatsphere-key.pem ubuntu@${aws_instance.chatsphere.public_ip}"
  description = "SSH command"
}