
resource "aws_iam_policy" "lambda-s3-trigger" {
  name   = "tf-lamda-s3-trigger"
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
                "Resource": "*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": "*"
            }
        ]
    }
    EOF

}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda_with_s3_trigger"
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

resource "aws_iam_policy_attachment" "lambda-s3-trigger-policy-attachment" {
  name = "lambda-s3-trigger-policy"

  roles      = ["${aws_iam_role.iam_for_lambda.name}"]
  policy_arn = aws_iam_policy.lambda-s3-trigger.arn
}


resource "aws_iam_policy_attachment" "cloudWatch-attachment" {
  name = "lambda-s3-trigger-policy-cloudwatch"

  roles      = ["${aws_iam_role.iam_for_lambda.name}"]
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchFullAccess"
}


resource "aws_iam_policy_attachment" "cloudFront-attachment" {
  name = "lambda-s3-trigger-policy-cloudwatch"

  roles      = ["${aws_iam_role.iam_for_lambda.name}"]
  policy_arn = "arn:aws:iam::aws:policy/CloudFrontFullAccess"
}
