import json
from django.test import TestCase, Client
from ..models import Category, Club, User, UserProfile, Department, Major
from ..application_models import Application, ShortTextForm, LongTextForm, ImageForm, FileForm, MultiChoiceForm


class ApplicationFormTestCase(TestCase):
    def setUp(self):
        category = Category.objects.create(id=1, name='category1')
        club = Club.objects.create(id=1, name='club1', summary='summary1', description='description1',
                                   category=category)
        Application.objects.create(id=1, club=club)
        dept = Department.objects.create(id=1, name='dept1')
        major = Major.objects.create(id=1, dept=dept, name='major1')
        user = User.objects.create_user(
            id=1, username='user1', password='pw1', last_name='name1')
        UserProfile.objects.create(id=1, user=user, dept=dept, major=major)
        user = User.objects.create_user(
            id=2, username='user2', password='pw2', last_name='name2')
        UserProfile.objects.create(id=2, user=user, dept=dept, major=major)

    def test_application_not_found(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/10/application/form/')
        self.assertEqual(response.status_code, 404)

    def test_get_application_success(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/club/1/application/form/')
        expected = {'id': 1,
                    'club': 1,
                    'short_texts': [],
                    'long_texts': [],
                    'multi_choices': [],
                    'images': [],
                    'files': [],
                    'user': None}
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_put_shortText(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps([{
            'type': 'shortText',
            'order': 1,
            'title': 'title'
        }, {
            'type': 'image',
            'order': 2,
            'title': 'title'
        }])
        response = client.put('/api/club/1/application/form/',
                              test_json, content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(ShortTextForm.objects.all()), 1)

    def test_put_longText(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps([{
            'type': 'longText',
            'order': 1,
            'title': 'title'
        }])
        response = client.put('/api/club/1/application/form/',
                              test_json, content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(LongTextForm.objects.all()), 1)

    def test_put_multiChoice(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps([{
            'type': 'multiChoice',
            'order': 1,
            'title': 'title',
            'choices': [{'title': 'hi', 'content': '1'}]
        }])
        response = client.put('/api/club/1/application/form/',
                              test_json, content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(MultiChoiceForm.objects.all()), 1)

    def test_put_file(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps([{
            'type': 'file',
            'order': 1,
            'title': 'title'
        }])
        response = client.put('/api/club/1/application/form/',
                              test_json, content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(FileForm.objects.all()), 1)

    def test_put_image(self):
        client = Client(enforce_csrf_checks=False)
        test_json = json.dumps([{
            'type': 'image',
            'order': 1,
            'title': 'title'
        }])
        response = client.put('/api/club/1/application/form/',
                              test_json, content_type='application/json')

        self.assertEqual(response.status_code, 204)
        self.assertEqual(len(ImageForm.objects.all()), 1)

    def test_application_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/club/1/application/form/')
        self.assertEqual(response.status_code, 405)
