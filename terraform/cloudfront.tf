# locals {
#   s3_origin_id = "github-viewer-id"
# }

locals {
  s3_origin_id   = "${aws_s3_bucket.tf-github-viewer-bucket.bucket}-origin"
  s3_domain_name = "${aws_s3_bucket.tf-github-viewer-bucket.bucket}.s3.ap-south-1.amazonaws.com"
}

resource "aws_cloudfront_origin_access_control" "s3-OAC-github-viewer" {
  name                              = "github-viewer-OAC"
  description                       = "OAC for github-viewer"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "github-viewer-cloudfront" {
  origin {
    origin_id                = local.s3_origin_id
    domain_name              = local.s3_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3-OAC-github-viewer.id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {

    target_origin_id = local.s3_origin_id
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]

    forwarded_values {
      query_string = true

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  price_class = "PriceClass_200"

  tags = {
    Environment = "staging"
  }
}