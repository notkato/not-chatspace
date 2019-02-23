json.text @message.text
json.name @message.user.name
json.time @message.created_at.strftime('%Y年%m月%d日 %H:%M:%S')
json.image_url @message.image.url
json.id @message.id