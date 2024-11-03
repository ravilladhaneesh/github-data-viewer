import json
#import boto3
import datetime
# import requests


def lambda_handler(event, context):

    try:
        #s3 = boto3.client('s3', region_name='ap-south-1')
        #print(s3)

        now = datetime.datetime.now()
        now_ts = now.timestamp()
        #print(type(now_ts))

        #client = boto3.client('cloudfront')
        # response = client.create_invalidation(
        #     DistributionId='E236GIQKH21QJ4',
        #     InvalidationBatch={
        #         'Paths': {
        #             'Quantity': 1,
        #             'Items': [
        #                 '/*',
        #             ]
        #         },
        #         'CallerReference': str(now_ts)
        #     }
        # )
        # print(response)
        
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Successfully invalidated the github-viewer cloudfront",
            }),
        }
    except Exception as err:
        print(f'github-viewer Cloudfront invalidation exception {err}')
        return {
            "statusCode": 500,
            "body": json.dumps({
                "message": f"Error {err}"
            })
        }