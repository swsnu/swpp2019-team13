from django.test import TestCase, Client
import json
from .models import User, UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
from django.forms.models import model_to_dict

# # for test with file
# from PIL import Image
# import tempfile
# from django.test import override_settings

# def get_temporary_image(temp_file):
#     size = (200, 200)
#     color = (255, 0, 0, 0)
#     image = Image.new("RGBA", size, color)
#     image.save(temp_file, 'jpeg')
#     return temp_file


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


class ClubTestCase(TestCase):
    def setUp(self):
        category = Category.objects.create(id=1, name='category1')
        Club.objects.create(id=1, name='club1', summary='summary1', description='description1',
                            category=category)
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    def test_get_club_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/list/')
        expected = [{'id': 1, 'appliers': [],
                     'available_major': [],
                     'available_semester': 0,
                     'category': 1,
                     'description': 'description1',
                     'likers': [],
                     'managers': [],
                     'name': 'club1',
                     'poster_img': None,
                     'session_day': 0,
                     'summary': 'summary1',
                     'tags': []}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_club_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/club/list/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for manage_club
    #

    def test_get_manage_club_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/club/manage/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_manage_club_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/club/manage/')
        self.assertEqual(response.status_code, 401)

    def test_get_manage_club_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/club/manage/')
        self.assertEqual(response.status_code, 404)

    def test_get_manage_club_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/club/manage/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for like_club
    #

    def test_get_like_club_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/club/like/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_like_club_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/club/like/')
        self.assertEqual(response.status_code, 401)

    def test_get_like_club_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/club/like/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_like_club_success(self):
        client = Client(enforce_csrf_checks=False)
        club = Club.objects.get(id=1)

        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/club/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(club.likers.all()), 1)

        response = client.put('/api/user/1/club/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(club.likers.all()), 0)

    def test_like_club_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/club/like/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for apply_club
    #

    def test_get_apply_club_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/club/apply/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_apply_club_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/club/apply/')
        self.assertEqual(response.status_code, 401)

    def test_get_apply_club_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/club/apply/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_apply_club_success(self):
        client = Client(enforce_csrf_checks=False)
        club = Club.objects.get(id=1)

        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/club/apply/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(club.appliers.all()), 1)

        response = client.put('/api/user/1/club/apply/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(club.appliers.all()), 0)

    def test_apply_club_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/club/apply/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for recommend_club
    #

    def test_get_recommend_club_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_recommend_club_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 200)

    def test_get_recommend_club_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/club/recommend/')
        self.assertEqual(response.status_code, 404)

    def test_get_recommend_club_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 405)


class SomoimTestCase(TestCase):
    def setUp(self):
        category = Category.objects.create(id=1, name='category1')
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        Somoim.objects.create(id=1, title='somoim1', summary='summary1', description='description1',
                              goalJoiner=2, category=category)
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    def test_get_somoim_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/somoim/list/')
        expected = [{'id': 1, 'title': 'somoim1',
                     'joiners': [],
                     'available_major': [],
                     'available_semester': 0,
                     'category': 1,
                     'description': 'description1',
                     'goalJoiner': 2,
                     'likers': [],
                     'managers': [],
                     'session_day': 0,
                     'summary': 'summary1',
                     'tags': []}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_post_somoim(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps(
            {'title': 'somoim2', 'summary': 'summary2', 'description': 'description2',
             'category': 1, 'goalJoiner': 1, 'available_major': [1],
             'available_semester': 1, 'session_day': 1})
        response = client.post('/api/somoim/list/',
                               test_json, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Somoim.objects.all()), 2)

    def test_put_somomim_list_fail(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({'id': 2})
        response = client.put('/api/somoim/list/',
                              test_json, content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_somoim_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/somoim/list/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for manage_somoim
    #

    def test_get_manage_somoim_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_manage_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 401)

    def test_get_manage_somoim_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/somoim/manage/')
        self.assertEqual(response.status_code, 404)

    def test_get_manage_somoim_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 405)

    # test add, remove both
    def test_put_manage_somoim_success(self):
        client = Client(enforce_csrf_checks=False)
        somoim = Somoim.objects.get(id=1)

        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/somoim/manage/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.managers.all()), 1)

        response = client.put('/api/user/1/somoim/manage/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.managers.all()), 0)

    def test_manage_somoim_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for like_somoim
    #

    def test_get_like_somoim_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_like_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 401)

    def test_get_like_somoim_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/somoim/like/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_like_somoim_success(self):
        client = Client(enforce_csrf_checks=False)
        somoim = Somoim.objects.get(id=1)

        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/somoim/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.likers.all()), 1)

        response = client.put('/api/user/1/somoim/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.likers.all()), 0)

    def test_like_somoim_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for join_somoim
    #

    def test_get_join_somoim_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_join_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 401)

    def test_get_join_somoim_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/somoim/join/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_join_somoim_success(self):
        client = Client(enforce_csrf_checks=False)
        somoim = Somoim.objects.get(id=1)

        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/somoim/join/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.joiners.all()), 1)

        response = client.put('/api/user/1/somoim/join/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.joiners.all()), 0)

    def test_join_somoim_list_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for recommend_somoim
    #

    def test_get_recommend_somoim_list_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/somoim/recommend/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_recommend_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/recommend/')
        self.assertEqual(response.status_code, 200)

    def test_get_recommend_somoim_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/2/somoim/recommend/')
        self.assertEqual(response.status_code, 404)

    def test_get_recommend_somoim_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/somoim/recommend/')
        self.assertEqual(response.status_code, 405)


class PreClubTestCase(TestCase):
    @override_settings(MEDIA_ROOT=tempfile.gettempdir())
    def setUp(self):
        Category.objects.create(id=1, name='category1')
        # dept = Department.objects.create(id=1, name='dept1')
        # major = Major.objects.create(id=1, dept=dept, name='major1')
        # user = User.objects.create_user(
        #     id=1, username='user1', password='pw1', last_name='name1')
        # UserProfile.objects.create(id=1, user=user, dept=dept, major=major)

    # def test_post_preclub_success(self):
    #     client = Client(enforce_csrf_checks=False)

    #     temp_file = tempfile.NamedTemporaryFile()
    #     test_image = get_temporary_image(temp_file)
    #     # picture = Picture.objects.create(picture=test_image.name)
    #     # self.assertEqual(len(Picture.objects.all()), 1)

    #     # mock_img = {'FILES':{'image':[]}}

    #     response = client.post('/api/preclub/list/', json.dumps(
    #         {'name': 'user1', 'category': 1, 'manager': 'pw1', 'auth_img': test_image.name}),
    #         content_type='application/json')

    #     self.assertEqual(response.status_code, 201)
    #     self.assertEqual(len(PreClub.objects.all()), 1)

    def test_preclub_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/preclub/list/')
        self.assertEqual(response.status_code, 405)
