
data "aws_iam_policy_document" "cloudfront-s3-access-policy" {
  statement {
    sid = "CloudFrontS3GetAccess"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.tf-github-viewer-bucket.arn}/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values = [
        "${aws_cloudfront_distribution.github-viewer-cloudfront.arn}"
      ]
    }
  }
}


resource "aws_s3_bucket_policy" "cloudfront-policy" {
  bucket = aws_s3_bucket.tf-github-viewer-bucket.id
  policy = data.aws_iam_policy_document.cloudfront-s3-access-policy.json
}