terraform {
  backend "s3" {
    bucket = "github-repo-manager"
    key    = "tf-files/state/github-viewer/terraform.tfstate"
    region = "ap-south-1"
  }
}