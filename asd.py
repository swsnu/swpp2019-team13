import requests

api_key = 'acc_a5456ea645db19d'
api_secret = '4d87ad8101b40cf70577cdbe904313e5'
image_path = './backend/media/1.jpg'

response = requests.post('https://api.imagga.com/v2/tags',
                         auth=(api_key, api_secret),
                         files={'image': open(image_path, 'rb')})
print response.json()
