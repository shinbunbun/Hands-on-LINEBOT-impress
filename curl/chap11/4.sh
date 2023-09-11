curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content \
-H 'Authorization: Bearer {AccessToken}' \
-H "Content-Type: image/png" \
-T {imagePath}
