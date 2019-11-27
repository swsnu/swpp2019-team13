import json
from django.test import TestCase, Client
from ..models import User, UserProfile, Department, Major


class UserTestCase(TestCase):
    def setUp(self):
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    def test_get_user_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/list/')
        expected = [{'id': 1,
                     'grade': 1,
                     'dept': {'id': 1, 'name': 'dept1'},
                     'major': {'dept': 1, 'id': 1, 'name': 'major1'},
                     'join_somoims': [],
                     'like_clubs':[],
                     'like_somoims':[],
                     'manage_clubs': [],
                     'manage_somoims':[],
                     'user':{'last_name': 'name1', 'username': 'user1'},
                     'available_semester': 1,
                     'available_session_day': 0,
                     'apply_clubs': []}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_user_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/user/list/')
        self.assertEqual(response.status_code, 405)

    def test_signup_success(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps(
            {'email': 'email1', 'password': 'pw1', 'name': 'name1', 'dept': 1, 'major': 1,
             'grade': 1, 'available_semester': 1, 'available_session_day': 1})
        response = client.post('/api/user/signup/',
                               test_json, content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_signup_keyError(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({'hi': 'hi'})
        response = client.post('/api/user/signup/',
                               test_json, content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signup_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/signup/')
        self.assertEqual(response.status_code, 405)

    def test_signin_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_signin_fail(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'wrong_pw'}), content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_signin_keyError(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'hi': 'hi'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_signin_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/signin/')
        self.assertEqual(response.status_code, 405)

    def test_signout_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 204)

    def test_signout_fail(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/signout/')
        self.assertEqual(response.status_code, 401)

    def test_signout_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.delete('/api/user/signout/')
        self.assertEqual(response.status_code, 405)

    def test_get_login_info_when_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/logininfo/')
        expected = {'id': 1, 'name': 'name1', 'email': 'user1',
                    'dept': 1, 'major': 1, 'grade': 1,
                    'available_semester': 1, 'available_session_day': 0}
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_get_login_info_when_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/logininfo/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, None)

    def test_login_info_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/user/logininfo/')
        self.assertEqual(response.status_code, 405)

    def test_put_user_info_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        test_json = json.dumps(
            {'name': 'name2', 'dept': 1, 'major': 1,
             'grade': 2, 'available_semester': 2, 'available_session_day': 3})
        response = client.put('/api/user/info/',
                              test_json, content_type='application/json')
        expected = {'id': 1, 'name': 'name2', 'email': 'user1',
                    'dept': 1, 'major': 1, 'grade': 2,
                    'available_semester': 2, 'available_session_day': 3}
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_put_user_info_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps(
            {'name': 'name2', 'dept': 1, 'major': 1,
             'grade': 2, 'available_semester': 2, 'available_session_day': 3})
        response = client.put('/api/user/info/',
                              test_json, content_type='application/json')
        self.assertEqual(response.status_code, 401)

    def test_user_info_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/info/')
        self.assertEqual(response.status_code, 405)
