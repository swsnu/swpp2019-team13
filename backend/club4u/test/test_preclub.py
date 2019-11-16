import json
from django.test import TestCase, Client
from ..models import User, UserProfile, Department, Category, Major, PreClub


class PreClubTestCase(TestCase):
    def setUp(self):
        Category.objects.create(id=1, name='category1')
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    def test_post_preclub_success(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps(
            {'name': 'name', 'manager': 'manager', 'category': 1, 'auth_img': {}})
        response = client.post('/api/preclub/list/',
                               test_json, content_type='application/json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(len(PreClub.objects.all()), 1)

    def test_preclub_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/preclub/list/')
        self.assertEqual(response.status_code, 405)
