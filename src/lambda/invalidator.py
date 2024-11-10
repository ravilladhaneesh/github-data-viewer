import json
import boto3
import datetime
# import requests
import os

def lambda_handler(event, context):

    distributionId = os.environ.get('DISTRIBUTION_ID')
    print(distributionId)
    now = datetime.datetime.now()
    now_ts = now.timestamp()
    #print(type(now_ts))
    print(event)
    invalidatorBatchParam = {
                'Paths': {
                    'Quantity': 1,
                    'Items': [
                        '/*',
                    ]
                },
                'CallerReference': str(now_ts)
        }
    try:
        s3 = boto3.client('s3', region_name='ap-south-1')
        print(s3)

        

        client = boto3.client('cloudfront')
        response = client.create_invalidation(
            DistributionId=distributionId,
            InvalidationBatch=invalidatorBatchParam,
        )
        print(response)
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Successfully invalidated the github-viewer cloudfront",
            }),
        }
    except Exception as err:
        print(f'github-viewer Cloudfront invalidation exception {str(err)}')
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": f"Error {str(err)}"
            })
        }