terraform {
  backend "s3" {
    bucket = "tf-state-bucket-github-viewer"
    key    = "tf-files/state/terraform.tfstate"
    region = "us-west-2"
  }
}