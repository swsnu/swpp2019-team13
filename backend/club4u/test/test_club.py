import json
from django.test import TestCase, Client
from ..models import User, UserProfile, Club, Department, Category, Major, ClubPoster, Tag
from ..application_models import *


class ClubTestCase(TestCase):
    def setUp(self):
        category = Category.objects.create(id=1, name='category1')
        club = Club.objects.create(id=1, name='club1', summary='summary1', description='description1',
                                   category=category)
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)
        user = User.objects.create_user(
            id=2, username='user2', password='pw2', last_name='name2')
        UserProfile.objects.create(id=2, user=user, dept=dept, major=major)
        ClubPoster.objects.create(id=1, img="img", club=club)
        application_form = Application.objects.create(club=club)
        ShortTextForm.objects.create(
            application=application_form, order=0, title='')
        LongTextForm.objects.create(
            application=application_form, order=1, title='')
        multi_form = MultiChoiceForm.objects.create(
            application=application_form, order=2, title='')
        Choice.objects.create(multi=multi_form, title='t', content='')
        ImageForm.objects.create(
            application=application_form, order=3, title='')
        FileForm.objects.create(
            application=application_form, order=4, title='')

        application1 = Application.objects.create(user_id=1, club=club)
        ShortTextForm.objects.create(
            application=application1, order=0, title='')
        LongTextForm.objects.create(
            application=application1, order=1, title='')
        multi1 = MultiChoiceForm.objects.create(
            application=application1, order=2, title='')
        Choice.objects.create(multi=multi1, title='t', content='')
        ImageForm.objects.create(
            application=application1, order=3, title='')
        FileForm.objects.create(
            application=application1, order=4, title='')

    def test_get_club_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/list/')
        expected = [{'id': 1, 'appliers': [],
                     'available_major': [],
                     'available_semester': 0,
                     'category': 1,
                     'description': 'description1',
                     'likers': [],
                     'isShow': False,
                     'managers': [],
                     'name': 'club1',
                     'poster_img': ['img'],
                     'recruit_start_day': None,
                     'recruit_end_day': None,
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

    def test_put_apply_club(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/user/1/club/apply/', json.dumps(
            {'id': 1}), content_type='application/json')
        response = client.put('/api/user/1/club/apply/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_put_apply_club_without_existing_one(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user2', 'password': 'pw2'}), content_type='application/json')
        response = client.put('/api/user/2/club/apply/', json.dumps(
            {'id': 1}), content_type='application/json')
        self.assertEqual(response.status_code, 204)

    # test add, remove both
    # TODO : re-implement after applying method is done
    # def test_put_apply_club_success(self):
    #     client = Client(enforce_csrf_checks=False)
    #     club = Club.objects.get(id=1)

    #     response = client.post('/api/user/signin/', json.dumps(
    #         {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
    #     response = client.put('/api/user/1/club/apply/', json.dumps(
    #         {'id': 1}), content_type='application/json')
    #     self.assertEqual(response.status_code, 204)
    #     self.assertEqual(len(club.appliers.all()), 1)

    #     response = client.put('/api/user/1/club/apply/', json.dumps(
    #         {'id': 1}), content_type='application/json')
    #     self.assertEqual(response.status_code, 204)
    #     self.assertEqual(len(club.appliers.all()), 0)

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

    #
    # Test Case for club
    #

    def test_get_club_by_id_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/1/')
        expected = {'id': 1, 'appliers': [],
                    'available_major': [],
                    'available_semester': 0,
                    'category': 1,
                    'description': 'description1',
                    'likers': [],
                    'isShow': False,
                    'managers': [],
                    'name': 'club1',
                    'poster_img': ['img'],
                    'recruit_start_day': None,
                    'recruit_end_day': None,
                    'session_day': 0,
                    'summary': 'summary1',
                    'tags': []}
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_get_club_by_id_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/10/')
        self.assertEqual(response.status_code, 404)

    def test_edit_club_info_success(self):
        Tag.objects.create(id=1, name='TAG_1')
        Tag.objects.create(id=2, name='TAG_2')
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({
            'available_major': [1],
            'available_semester': 2,
            'category': 1,
            'description': 'description1',
            'isShow': False,
            'managers': [],
            'name': 'club1',
            'recruit_start_day': '2019-11-16T',
            'recruit_end_day': '2019-11-16T',
            'session_day': 3,
            'summary': 'summary1',
            'selected_tag': ["TAG_1", "NEW_TAG_1"],
            'removed_tag': ["TAG_2", "NEW_TAG_2"],
            'tags': [{'text': "TAG_1"}, {'text': "NEW_TAG_1"}]})
        response = client.put('/api/club/1/',
                              test_json, content_type='application/json')

        self.assertEqual(len(Tag.objects.all()), 4)

        self.assertEqual(response.status_code, 204)

    def test_edit_club_info_not_found(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({'hi': 'hi'})
        response = client.put('/api/club/2/',
                              test_json, content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_club_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/club/1/')
        self.assertEqual(response.status_code, 405)

    # def test_clubposter_success(self):
    #     client = Client(enforce_csrf_checks=False)
    #     test_file = open('testdata/test.jpg')
    #     response = client.post('/api/club/1/poster/',
    #     {'file' : test_file}, content_type='application/json')
    #     self.assertEqual(response.status_code, 204)

    def test_clubposter_not_found(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps({'hi': 'hi'})
        response = client.post('/api/club/10/poster/',
                               test_json, content_type='application/json')
        self.assertEqual(response.status_code, 404)

    def test_clubposter_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/club/1/poster/')
        self.assertEqual(response.status_code, 405)

    def test_get_application(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/club/1/application/')
        self.assertEqual(response.status_code, 200)

    def test_get_application_invalid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/club/2/application/')
        self.assertEqual(response.status_code, 404)

    def test_put_application(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.put('/api/club/1/application/', json.dumps([
            {'type': 'shortText', 'order': 0, 'content': 'test'},
            {'type': 'longText', 'order': 1, 'content': 'test'},
            {'type': 'multiChoice', 'order': 2, 'content': 'test',
                'choices': [{'title': "t", 'checked': True},
                            ]},
            {'type': ''}
        ]),
            content_type='application/json')
        self.assertEqual(response.status_code, 204)

    def test_post_application(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.post('/api/club/1/application/')
        self.assertEqual(response.status_code, 204)

    def test_application_invalid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/club/1/application/')
        self.assertEqual(response.status_code, 405)

    def test_get_application_list(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.get('/api/club/1/application/list/')
        self.assertEqual(response.status_code, 200)

    def test_application_list_invalid(self):
        client = Client(enforce_csrf_checks=False)
        response = client.post('/api/user/signin/', json.dumps(
            {'email': 'user1', 'password': 'pw1'}), content_type='application/json')
        response = client.patch('/api/club/1/application/list/')
        self.assertEqual(response.status_code, 405)
