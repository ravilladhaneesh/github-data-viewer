data "archive_file" "lambda-invalidator-source" {
  type        = "zip"
  source_file = "../src/lambda/invalidator.py"
  output_path = "../files/invalidator.zip"
}


# data "aws_iam_policy_document" "lambda-s3-trigger" {
#   statement {
#     sid = "Log"
#     effect = "Allow"
#     resources = [
#         "arn:aws:logs:*:*:*"
#     ]
#     actions = [
#         "logs:PutLogEvents",
#         "logs:CreateLogGroup",
#         "logs:CreateLogStream"
#     ]
#   }
#   statement {
#     sid = "s3GetObject"
#     effect = "Allow"
#     resources = [
#         "${aws_s3_bucket.tf-github-viewer-bucket.arn}",
#         "${aws_s3_bucket.tf-github-viewer-bucket.arn}/*"
#     ]
#     actions = [
#         "s3:GetObject"
#     ]
#   }
# }


resource "aws_iam_policy" "lambda-s3-trigger" {
    name = "tf-lamda-s3-trigger"
    policy = <<EOF
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "logs:PutLogEvents",
                    "logs:CreateLogGroup",
                    "logs:CreateLogStream"
                ],
                "Resource": "arn:aws:logs:*:*:*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": "arn:aws:s3:::*/*"
            }
        ]
    }
    EOF

}

resource "aws_iam_role" "iam_for_lambda" {
  name  = "iam_for_lambda_with_s3_trigger"
  assume_role_policy = <<EOF
  {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": "lambda.amazonaws.com"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }
  EOF
}

resource "aws_iam_policy_attachment" "test-attach" {
  name       = "lambda-s3-trigger-policy"
  
  roles      = ["${aws_iam_role.iam_for_lambda.name}"]
  policy_arn = "${aws_iam_policy.lambda-s3-trigger.arn}"
}

resource "aws_lambda_function" "test_lambda" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "../files/invalidator.zip"
  function_name = "viewer-cloudfront-invalidator"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "invalidator.lambda_handler"

  source_code_hash = data.archive_file.lambda-invalidator-source.output_base64sha256

  runtime = "python3.12"

  environment {
    variables = {
      foo = "bar"
    }
  }
}


# output "role-json" {
#   value = data.aws_iam_policy_document.lambda-s3-trigger.json
# }