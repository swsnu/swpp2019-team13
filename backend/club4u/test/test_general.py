import json
from django.test import TestCase, Client
from ..models import Tag, Department, Category, Major


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
    def setUp(self):
        Tag.objects.create(id=1, name='말하기')
        Tag.objects.create(id=2, name='다담')

    def test_get_tag(self):
        client = Client(enforce_csrf_checks=False)
        response = client.get('/api/tag/list/')
        expected = [{'id': 1, 'name': '말하기', 'selected': 1, 'suggested': 1}, {
            'id': 2, 'name': '다담', 'selected': 1, 'suggested': 1}]
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, expected)

    def test_tag_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/tag/list/')
        self.assertEqual(response.status_code, 405)

    def test_tag_extract_success(self):
        test_description = "―여러분의 ‘무언가’를 말 속에 다 담을 수 있나요?\
                        \
                        서울대학교 말하기 동아리 다담은 다양한 스피치와 토론을 경험하고, 체계적으로 연습할 수 있는 역사가 깊은 중앙 동아리입니다. 일상생활을 살아가다보면, 우리는 다양한 ‘말하기’ 상황을 맞이하게 됩니다. 상황에 맞는 말하기는 누군가의 마음을 움직일 수 있지만, 그렇지 못한 말하기는 반대로 돌려 세우기도 합니다. 어떠한 상황에서도 자신의 생각을 온전히 말로 표현할 수 있도록 도와주는 것이 다담의 비전이며, 이를 실현하기 위해 아래와 같은 활동들을 꾸준히 진행하고 있습니다.\
                        \
                        1) 정규 세션\
                        다담은 매주 목요일 6시 반에 정기적으로 스피치와 토론 활동을 진행합니다. 설득 스피치, 오감만족 스피치, 즉석 스피치 등의 스피치 세션, 그리고 CEDA 토론과 옥스퍼드 토론 등의 토론 세션을 진행하여 다담 회원들에게 다양한 말하기 기회를 제공합니다. 더불어 매 세션마다 즉각적이고 체계적인 피드백을 진행하여, 회원들의 말하기를 지속적으로 정교화하고 보완합니다. 이런 노력의 결과로, 다담은 제3회 전국 대학생 토론대회 준우승, 제4회 토론왕 선발대회 우승, 제3회 전국 대학생 경영토론 우승 등 다양한 대회에서 우수한 성과를 얻어왔습니다.\
                        \
                        2) 연구 세션\
                        이번 회기부터 새롭게 신설된 연구 세션은 필수 참여가 아닌 자율 참여의 방식으로 진행될 예정입니다. 수요일 저녁에 진행될 예정인 연구 세션은 정규 세션에서는 시간적, 물리적 한계로 다루지 못하는 말하기/토론에 대한 이론적 측면을 집중적으로 탐구하며 정규세선에서 진행한 토론 또는 외부 토론 영상 등을 분석, 피드백 하는 시간도 편성하였습니다. 또한 이번 학기에 예정된 SNU 토론 한마당 참여를 위한 체계적인 준비도 병행할 예정입니다.\
                        \
                        3) 타 대학과의 교류전\
                        다담 활동은 서울대에 한정되지 않습니다. 저번 회기 다담은 한양대와의 교류전인 ‘수도전’의 토론대표로 출전하여 우승을 거두었습니다. 또한 다담에서는 매 학기마다 고려대 토론동아리 <코기토>와의 교류전을 통해, 회원들의 말하기 실력 향상을 도모하고 있습니다. 타 대학의 다양한 사람들과 만나고 자신의 생각을 나누고 싶으신 분들은 다담에 들어와 교류전에 참여하는 것을 추천합니다.\
                        \
                        4) 그 외 대외활동\
                        다담 회원들은 정기적으로 진행되는 정규 세션과 교류전 외에도, 다양한 대외활동에 참여할 기회가 주어집니다. 지난 학기 다담은 MBC <100분 토론>의 대학생 패널로 참여했으며, 이번 학기 역시 토론 방송프로그램 방청을 계획하고 있습니다. 토론 방청 외에도 다담은 <동행프로젝트>와 연계하여 고등학교 스피치&토론 멘토링 교육봉사를 진행하고 있으며, CTL에서 주최하는 <SNU 논리적 토론과정>의 코치로도 7회째 활동하고 있습니다. 쉽게 경험할 수 없는 다담의 다양한 대외활동에 참여하세요!\
                        \
                        5) 친목 활동\
                        다담은 여러 단과대에 재학 중인 다양한 학번의 회원들이 골고루 분포하고 있으면서도, 여러 친목 활동을 통해 끈끈한 친목을 도모하고 있습니다. 세션이 끝나고 뒤풀이에 참여할 수 있을 뿐만 아니라, 기수별 모임을 동아리에서 활발하게 지원하기 때문에 기수간의 친목도 도모할 수 있습니다. 또한 신나는?? 엠티와 여행이 계획되어 있기 때문에, 좋은 사람들과 함께 즐거운 추억들을 쌓을 수 있답니다. 다담에서 여러분의 말하기 실력뿐 아니라 다양한 생각을 가진 사람들과 교류할 수 있는 기회를 얻으세요!\
                        \
                        - 설명회 및 면접 일정\
                        \
                        동아리 설명회 : 9월 4일 (수) 저녁 6시, 사회과학대학 신양학술정보관 406호\
                        동아리 면접 : 9월 9일 (월), 지원자에게 시간 개별공지\
                        \
                        다담에 대해 관심이 있으신 분들은 꼭 동아리 설명회에 오셔서 자세한 정보를 얻어가길 바랍니다. 설명회에서는 실제 다담 세션에서 진행하는 대중 연설, 자유토론을 직접 관람할 수 있다는 거! 다담에서 진행하는 활동을 미리 경험해보고 싶다면 설명회에 오시는 것을 추천합니다!\
                        \
                        다담과 함께 여러분의 생각을 말 속에 다 담아보고 싶으시다면, snudadam@gmail.com 으로 9월 6일 23시 59분 까지 지원서를 전송해주시기 바랍니다!"
        client = Client(enforce_csrf_checks=False)

        response = client.post('/api/tag/extlist/', json.dumps(
            {'description': test_description}), content_type='application/json')

        self.assertEqual(response.status_code, 200)

    def test_tag_extract_wrong_method(self):
        client = Client(enforce_csrf_checks=False)
        response = client.patch('/api/tag/extlist/')
        self.assertEqual(response.status_code, 405)
