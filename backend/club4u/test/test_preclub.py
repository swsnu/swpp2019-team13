# import json
from django.test import TestCase, Client
from ..models import User, UserProfile, Department, Category, Major

# for test with file
# from django.test import override_settings
# from django.core.files.uploadedfile import SimpleUploadedFile
# import base64
# import os

# small_gif = (
#     b'\x47\x49\x46\x38\x39\x61\x01\x00\x01\x00\x00\x00\x00\x21\xf9\x04'
#     b'\x01\x0a\x00\x01\x00\x2c\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02'
#     b'\x02\x4c\x01\x00\x3b'
# )


# @override_settings(MEDIA_ROOT='club4u/test/testdata/')
class PreClubTestCase(TestCase):
    def setUp(self):
        Category.objects.create(id=1, name='category1')
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    # def test_post_preclub_success(self):
    #     client = Client(enforce_csrf_checks=False)

    #     # mock_img = SimpleUploadedFile(
    #     #     'test.gif', small_gif, content_type='image/gif')

    #     with open(os.path.join('club4u/test/testdata/', "test.jpg")) as file:
    #         response = client.post('/api/preclub/list/', json.dumps(
    #             {'name': 'user1', 'category': 1, 'manager': 'pw1',
    #              'auth_img': }),
    #             content_type='application/json')

    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(len(PreClub.objects.all()), 1)

    def test_preclub_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/preclub/list/')
        self.assertEqual(response.status_code, 405)
