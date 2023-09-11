curl -v -X POST https://api.line.me/v2/bot/message/push \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {AccessToken}' \
-d '{
    "to": "{userId}",
    "messages":[
        {
            "type":"text",
            "text":"Hello, world"
        }
    ]
}'
