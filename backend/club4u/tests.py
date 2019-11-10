from django.test import TestCase, Client
import json
from .models import User, UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
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
        expected = [{'available_semester': 1,
                     'available_session_day': 0,
                     'dept_id': 1,
                     'grade': 1,
                     'id': 1,
                     'major_id': 1,
                     'user_id': 1}]
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


# class PreClubTestCase(TestCase):
#     def setUp(self):
#         user1 = User.objects.create_user(username='user1', password='1')
#         Category.objects.create(name='category1')

#     def test_post_preclub_success(self):
#         client = Client(enforce_csrf_checks=False)

#         mock_img = File(open(os.path.join(self.test_root, "media/cat.jpg")))

#         response = client.post('/api/preclub/', json.dumps(
#             {'name': 'user1', 'category': 1, 'manager': 'pw1', 'auth_img': mock_img}),
#             content_type='application/json')

#         self.assertEqual(response.status_code, 201)
#         self.assertEqual(len(PreClub.objects.all()), 1)
