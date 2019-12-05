import json
from django.test import TestCase, Client
from ..models import User, UserProfile, Somoim, Department, Category, Major


def getLoggedInClient():
    client = Client(enforce_csrf_checks=False)
    client.post('/api/user/signin/', json.dumps(
        {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
    return client


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
        user = User.objects.create_user(
            id=2, username='user2', password='pw2', last_name='name2')
        UserProfile.objects.create(id=2, user=user, dept=dept, major=major)

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

    def test_put_somomim_list_success(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({'id': 1})
        response = client.put('/api/somoim/list/',
                              test_json, content_type='application/json')
        self.assertEqual(response.status_code, 200)

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
        client = getLoggedInClient()
        response = client.get('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_manage_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 401)

    def test_get_manage_somoim_list_user_not_found(self):
        client = getLoggedInClient()
        response = client.get('/api/user/10/somoim/manage/')
        self.assertEqual(response.status_code, 404)

    def test_get_manage_somoim_list_wrong_method(self):
        client = getLoggedInClient()
        response = client.patch('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 405)

    # test add, remove both
    def test_put_manage_somoim_success(self):
        client = getLoggedInClient()
        somoim = Somoim.objects.get(id=1)

        response = client.put('/api/user/1/somoim/manage/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.managers.all()), 1)

        response = client.put('/api/user/1/somoim/manage/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.managers.all()), 0)

    def test_manage_somoim_list_wrong_method(self):
        client = getLoggedInClient()
        response = client.patch('/api/user/1/somoim/manage/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for like_somoim
    #

    def test_get_like_somoim_list_success(self):
        client = getLoggedInClient()
        response = client.get('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_like_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 401)

    def test_get_like_somoim_list_user_not_found(self):
        client = getLoggedInClient()
        response = client.get('/api/user/10/somoim/like/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_like_somoim_success(self):
        client = getLoggedInClient()
        somoim = Somoim.objects.get(id=1)

        response = client.put('/api/user/1/somoim/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.likers.all()), 1)

        response = client.put('/api/user/1/somoim/like/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.likers.all()), 0)

    def test_like_somoim_list_wrong_method(self):
        client = getLoggedInClient()
        response = client.patch('/api/user/1/somoim/like/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for join_somoim
    #

    def test_get_join_somoim_list_success(self):
        client = getLoggedInClient()
        response = client.get('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, [])

    def test_get_join_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 401)

    def test_get_join_somoim_list_user_not_found(self):
        client = getLoggedInClient()
        response = client.get('/api/user/10/somoim/join/')
        self.assertEqual(response.status_code, 404)

    # test add, remove both
    def test_put_join_somoim_success(self):
        client = getLoggedInClient()
        somoim = Somoim.objects.get(id=1)

        response = client.put('/api/user/1/somoim/join/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.joiners.all()), 1)

        response = client.put('/api/user/1/somoim/join/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(somoim.joiners.all()), 0)

    def test_join_somoim_list_wrong_method(self):
        client = getLoggedInClient()
        response = client.patch('/api/user/1/somoim/join/')
        self.assertEqual(response.status_code, 405)

    #
    # Test Case for recommend_somoim
    #

    def test_get_recommend_somoim_list_success(self):
        client = getLoggedInClient()

        somoim = Somoim.objects.get(id=1)
        somoim2 = Somoim.objects.create(id=2, title='somoim2', summary='summary2', description='description2',
                                        goalJoiner=2, category=Category.objects.get(id=1))

        somoim.likers.set([2])
        somoim2.likers.set([1, 2])

        response = client.get('/api/user/1/somoim/recommend/')
        expected = [{'id': 1, 'title': 'somoim1',
                     'joiners': [],
                     'available_major': [],
                     'available_semester': 0,
                     'category': 1,
                     'description': 'description1',
                     'goalJoiner': 2,
                     'likers': [{'id': 2, 'user': {'username': 'user2', 'last_name': 'name2'},
                                 'dept': {'id': 1, 'name': 'dept1'},
                                 'major': {'id': 1, 'name': 'major1', 'dept': 1},
                                 'grade': 1, 'available_semester': 1,
                                 'available_session_day': 0,
                                 'manage_clubs': [], 'like_clubs':[1, 2],
                                 'apply_clubs':[], 'manage_somoims':[],
                                 'like_somoims':[], 'join_somoims':[]}],
                     'managers': [],
                     'session_day': 0,
                     'summary': 'summary1',
                     'tags': []}]

        self.assertEqual(response.status_code, 200)

    def test_get_recommend_somoim_list_success_but_no_list(self):
        client = getLoggedInClient()

        somoim = Somoim.objects.get(id=1)
        somoim2 = Somoim.objects.create(id=2, title='somoim2', summary='summary2', description='description2',
                                        goalJoiner=2, category=Category.objects.get(id=1))

        somoim2.likers.set([1, 2])

        response = client.get('/api/user/1/somoim/recommend/')
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

    def test_get_recommend_somoim_list_not_logged_in(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/user/1/somoim/recommend/')

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

    def test_get_recommend_somoim_list_user_not_found(self):
        client = getLoggedInClient()
        response = client.get('/api/user/10/somoim/recommend/')
        self.assertEqual(response.status_code, 404)

    def test_get_recommend_somoim_wrong_method(self):
        client = getLoggedInClient()
        response = client.patch('/api/user/1/somoim/recommend/')
        self.assertEqual(response.status_code, 405)

    # Test case for get somoim by ID

    def test_get_specific_somoim_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/somoim/1/')

        expected = {'id': 1, 'title': 'somoim1',
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
                    'tags': []}
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_get_specific_somoim_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/somoim/100/')
        self.assertEqual(response.status_code, 404)

    def test_get_specific_somoim_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/somoim/1/')
        self.assertEqual(response.status_code, 405)
