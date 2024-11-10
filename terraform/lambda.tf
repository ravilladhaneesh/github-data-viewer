data "archive_file" "lambda-invalidator-source" {
  type        = "zip"
  source_file = "../src/lambda/invalidator.py"
  output_path = "../files/invalidator.zip"
}


resource "aws_lambda_function" "test_lambda" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = data.archive_file.lambda-invalidator-source.output_path
  function_name = "viewer-cloudfront-invalidator"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "invalidator.lambda_handler"

  source_code_hash = data.archive_file.lambda-invalidator-source.output_base64sha256

  runtime = "python3.12"
  timeout = 10

  environment {
    variables = {
      DISTRIBUTION_ID = aws_cloudfront_distribution.github-viewer-cloudfront.id
    }
  }
}