from django.test import TestCase, Client
import json
from ..models import User, UserProfile, Tag, Department, Category, Major
from django.forms.models import model_to_dict


class GeneralTestCase(TestCase):
    def setUp(self):
        Category.objects.create(id=1, name='category1')
        dept = Department.objects.create(id=1, name='dept1')
        Major.objects.create(id=1, dept=dept, name='major1')

    # By default, csrf checks are disabled in test client
    # To test csrf protection we enforce csrf checks here
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/user/signup/', json.dumps({'email': 'user1', 'password': '1'}),
                               content_type='application/json')

        # Request without csrf token returns 403 response
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        # Get csrf token from cookie
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/user/signup/', json.dumps({'email': 'user1', 'password': '1'}),
                               content_type='application/json', HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 400)  # Pass csrf protection

    def test_token_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.put('/api/token/')
        self.assertEqual(response.status_code, 405)

    def test_get_category(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/category/list/')
        expected = [{'id': 1, 'name': 'category1'}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_category_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.put('/api/category/list/')
        self.assertEqual(response.status_code, 405)

    def test_get_dept(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/dept/list/')
        expected = [{'id': 1, 'name': 'dept1'}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_dept_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.put('/api/dept/list/')
        self.assertEqual(response.status_code, 405)

    def test_get_major(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/major/list/')
        expected = [{'id': 1, 'dept_id': 1, 'name': 'major1'}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_major_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.put('/api/major/list/')
        self.assertEqual(response.status_code, 405)


class TagTestCase(TestCase):
    def test_get_tag(self):
        client = Client(enforce_csrf_checks=False)
        Tag.objects.create(name='tag1')
        response = client.get('/api/tag/list/')
        expected = [{'id': 1, 'name': 'tag1'}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_tag_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/tag/list/')
        self.assertEqual(response.status_code, 405)
