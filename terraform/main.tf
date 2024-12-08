
# 1. Create an s3 bucket

resource "aws_s3_bucket" "tf-github-viewer-bucket" {
  bucket = "github-viewer"

  tags = {
    Name        = "terraform github-viewer bucket"
    Environment = "Dev"
  }
}

# 2. Bucket access

# #2.1 Add policy to the bucket to make it public

# resource "aws_s3_bucket_public_access_block" "tf-github-viewer-bucket-public-access" {
#   bucket = aws_s3_bucket.tf-github-viewer-bucket.id

#   block_public_acls   = false
#   block_public_policy = false
#   block_
# }

# #uncomment to enable public access
# data "aws_iam_policy_document" "public-access-policy"{
#   statement {
#     principals {
#       type = "*"
#       identifiers = ["*"]
#     }

#     actions = [
#     "s3:GetObject",
#       "s3:ListBucket",
#     ]

#     resources = [
#       aws_s3_bucket.tf-github-viewer-bucket.arn,
#       "${aws_s3_bucket.tf-github-viewer-bucket.arn}/*",
#     ]
#   }

# }

# resource "aws_s3_bucket_policy" "s3-public-access-policy" {
#   bucket = aws_s3_bucket.tf-github-viewer-bucket.id
#   policy = data.aws_iam_policy_document.public-access-policy.json
#   depends_on = [ aws_s3_bucket_public_access_block.tf-github-viewer-bucket-public-access ]
# }

#2.2 Make the s3 bucket private

# resource "aws_s3_bucket_public_access_block" "github-viewer-block-public-access" {
#   bucket = aws_s3_bucket.tf-github-viewer-bucket.id

#   block_public_acls   = true
#   block_public_policy = true
# }


# resource "aws_s3_bucket_acl" "s3-acl" {
#   bucket = aws_s3_bucket.tf-github-viewer-bucket.id
#   acl    = "private"
# }


# 3. Upload index.html, buildHTML.js, style.css files to the bucket

resource "aws_s3_object" "github-viewer-index" {
  bucket       = aws_s3_bucket.tf-github-viewer-bucket.bucket
  key          = "index.html"
  source       = "../src/static/index.html"
  content_type = "text/html"
  etag         = filemd5("../src/static/index.html")
}

resource "aws_s3_object" "github-viewer-buildHTML-js" {
  bucket       = aws_s3_bucket.tf-github-viewer-bucket.bucket
  key          = "buildHTML.js"
  source       = "../src/static/buildHTML.js"
  content_type = "application/javascript"
  etag         = filemd5("../src/static/buildHTML.js")
}

resource "aws_s3_object" "github-viewer-style-css" {
  bucket       = aws_s3_bucket.tf-github-viewer-bucket.bucket
  key          = "style.css"
  source       = "../src/static/style.css"
  content_type = "text/css"
  etag         = filemd5("../src/static/style.css")
}


resource "aws_s3_object" "github-viewer-github-logo" {
  bucket       = aws_s3_bucket.tf-github-viewer-bucket.bucket
  key          = "images/github-transparent.png"
  source       = "../src/static/images/github-transparent.png"
  content_type = "image/png"
  etag         = filemd5("../src/static/images/github-transparent.png")
}


# 4. Configure the bucket for static website hosting

# resource "aws_s3_bucket_website_configuration" "terraform-s3-static-website-config" {
#   bucket = aws_s3_bucket.tf-github-viewer-bucket.id

#   index_document {
#     suffix = "index.html"
#   }

# }

