resource "aws_s3_bucket" "tf-bucket" {
  bucket = "github-viewer"

  tags = {
    Name        = "terraform bucket"
    Environment = "Dev"
  }
}