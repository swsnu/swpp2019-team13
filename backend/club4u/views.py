from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
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

# api/user/signup/


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        dept = Department.objects.get(id=req_data['dept'])
        major = Major.objects.get(id=req_data['major'])
        grade = req_data['grade']
        available_semester = req_data['available_semester']
        user = User.objects.create_user(username=username, password=password)
        user.save()
        userprofile = UserProfile(
            user=user, dept=dept, major=major, grade=grade, available_semester=available_semester)
        userprofile.save()
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)


def like_club(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        clubs = [
            club for club in user.like_clubs.values()]
        return JsonResponse(clubs, safe=False)

    if request.method == 'PUT':
        # toggle user's like status for requested club
        body = request.body.decode()
        club_id = json.loads(body)['club_id']

        if user.like_clubs.get(id=club_id) == None:
            user.like_clubs.add(Club.objects.get(id=club_id))
        else:
            user.like_clubs.remove(user.like_clubs.get(id=club_id))
        return HttpResponse(status=204)

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
