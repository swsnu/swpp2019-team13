from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major, UserLikeClub, UserApplyClub, UserLikeSomoim, UserJoinSomoim
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

# api/major/list/


def major_list(request):
    if request.method == 'GET':
        response_dict = [major for major in Major.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

# api/dept/list/


def dept_list(request):
    if request.method == 'GET':
        response_dict = [dept for dept in Department.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

# api/user/list/


def user_list(request):
    if request.method == 'GET':
        response_dict = [user for user in UserProfile.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

# api/user/signup/


def signup(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            email = req_data['email']
            password = req_data['password']
            # use last name to save whole name
            name = req_data['name']
            dept = Department.objects.get(id=req_data['dept'])
            major = Major.objects.get(id=req_data['major'])
            grade = req_data['grade']
            available_semester = req_data['available_semester']
            user = User.objects.create_user(username=email, password=password)
            user.save()
            userprofile = UserProfile(user=user, name=name, dept=dept,
                                      major=major, grade=grade, available_semester=available_semester)
            userprofile.save()
            return HttpResponse(status=201)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

# api/user/signin/


def signin(request):
    if request.method == 'POST':
        try:
            body = request.body.decode()
            email = json.loads(body)['email']
            user_pw = json.loads(body)['password']
            user = authenticate(request, username=email, password=user_pw)
            if user is not None:
                login(request, user)
                userprofile = UserProfile.objects.get(user_id=user)
                response_dict = {'id': userprofile.id, 'name': userprofile.name, 'email': user.username,
                                 'dept': userprofile.dept.id, 'major': userprofile.major.id, 'grade': userprofile.grade,
                                 'available_semester': userprofile.available_semester}
                return JsonResponse(response_dict, safe=False)
            else:
                return HttpResponse(status=401)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)

# api/club/list/


def club_list(request):
    if request.method == 'GET':
        response_dict = [club for club in Club.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


# api/somoim/list/
def somoim_list(request):
    if request.method == 'GET':
        response_dict = [somoim for somoim in Somoim.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    elif request.method == 'POST':
        try:
            body = request.body.decode()
            article_title = json.loads(body)['title']
            article_content = json.loads(body)['content']
            acc_user = User.objects.get(username=request.user)
            article = Article(title=article_title,
                              content=article_content, author=acc_user)
            article.save()
            response_dict = {'id': article.id, 'title': article.title,
                             'content': article.content, 'author': article.author_id}
            return JsonResponse(response_dict, status=201)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
