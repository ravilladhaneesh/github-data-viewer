provider "aws" {
    region = "ap-south-1"
}


resource "aws_s3_bucket" "tf-bucket" {
  bucket = "tf-test-bucket-klialkljei"

  tags = {
    Name        = "terraform bucket"
    Environment = "Dev"
  }
}