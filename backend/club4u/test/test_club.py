from django.test import TestCase, Client
import json
from ..models import User, UserProfile, PreClub, Club, Tag, Department, Category, Major
from django.forms.models import model_to_dict


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
        user = User.objects.create_user(
            id=2, username='user2', password='pw2', last_name='name2')
        UserProfile.objects.create(id=2, user=user, dept=dept, major=major)

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
        response = client.get('/api/user/10/club/manage/')
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
        response = client.get('/api/user/10/club/like/')
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
        response = client.get('/api/user/10/club/apply/')
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
        club = Club.objects.get(id=1)
        club.likers.set([1, 2])
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 200)

    def test_get_recommend_club_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b'')

    def test_get_recommend_club_list_user_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/user/10/club/recommend/')
        self.assertEqual(response.status_code, 404)

    def test_get_recommend_club_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/user/1/club/recommend/')
        self.assertEqual(response.status_code, 405)
