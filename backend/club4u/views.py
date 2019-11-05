from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers


def pre_club(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        name = req_data['name']
        manager = req_data['manager']
        category = Category.objects.get(id=req_data['category'])
        auth_img = req_data['auth_img'].FILES['image']
        preclub = PreClub(
            name=name, manager=manager, category=category, auth_img=auth_img)
        preclub.save()
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)

def major_list(request):
    if request.method == 'GET':
        response_dict = [major for major in Major.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def dept_list(request):
    if request.method == 'GET':
        response_dict = [dept for dept in Department.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

def tag_list(request):
    if request.method == 'GET':
        response_dict = [tag for tag in Tag.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def user_list(request):
    if request.method == 'GET':
        response_dict = [user for user in UserProfile.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def club_list(request):
    if request.method == 'GET':
        response_dict = [club for club in Club.objects.all()]
        # print(response_dict[2].poster_img.path)
        serialized_data = serializers.serialize("json", response_dict)
        return HttpResponse(serialized_data)
    else:
        return HttpResponse(status=405)


def somoim_list(request):
    if request.method == 'GET':
        response_dict = [somoim for somoim in Somoim.objects.all()]
        serialized_data = serializers.serialize("json", response_dict)
        return HttpResponse(serialized_data)
        
    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        summary = req_data['summary']
        category = Category.objects.get(id=req_data['category'])
        description = req_data['description']
        goalJoiner = req_data['goalJoiner']
        currentJoiner = req_data['currentJoiner']
        likes = req_data['likes']
        available_sem = req_data['available_sem']
        somoim = Somoim(
            title=title,
            summary=summary,
            category=category,
            description=description,
            goalJoiner=goalJoiner,
            currentJoiner=CurrentJoiner,
            available_sem=available_sem,
            likes=likes
        )
        somoim.save()
        return HttpResponse(status=201)

    else:
        return HttpResponse(status=405)


# api/category/list/
def category_list(request):
    if request.method == 'GET':
        response_dict = [category for category in Category.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

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
            user = User.objects.create_user(
                username=email, password=password, last_name=name)
            user.save()
            userprofile = UserProfile(user=user, dept=dept,
                                      major=major, grade=grade, available_semester=available_semester)
            userprofile.save()
            return HttpResponse(status=201)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


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
                response_dict = {'id': userprofile.id, 'name': user.last_name, 'email': user.username,
                                 'dept': userprofile.dept.id, 'major': userprofile.major.id, 'grade': userprofile.grade,
                                 'available_semester': userprofile.available_semester}
                return JsonResponse(response_dict, safe=False)
            else:
                return HttpResponse(status=401)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)


def signout(request):
    if request.method == 'GET':
        if not request.user.is_anonymous:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)

# api/user/logininfo/


def logininfo(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            current_user = request.user
            userprofile = UserProfile.objects.get(user_id=current_user)
            response_dict = {'id': userprofile.id, 'name': current_user.last_name, 'email': current_user.username,
                             'dept': userprofile.dept.id, 'major': userprofile.major.id, 'grade': userprofile.grade,
                             'available_semester': userprofile.available_semester}
            return JsonResponse(response_dict, safe=False)
        else:
            return JsonResponse(None, safe=False)
    else:
        return HttpResponse(status=405)


def manage_club(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        serialized_data = serializers.serialize(
            "json", user.manage_clubs.all())
        return HttpResponse(serialized_data)
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
        serialized_data = serializers.serialize("json", user.like_clubs.all())
        return HttpResponse(serialized_data)

    elif request.method == 'PUT':
        # toggle user's like status for requested club
        body = request.body.decode()
        club_id = json.loads(body)['club_id']

        if user.like_clubs.get(id=club_id) is None:
            user.like_clubs.add(Club.objects.get(id=club_id))
        else:
            user.like_clubs.remove(user.like_clubs.get(id=club_id))
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def apply_club(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        serialized_data = serializers.serialize("json", user.apply_clubs.all())
        return HttpResponse(serialized_data)
    else:
        return HttpResponse(status=405)


def manage_somoim(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        serialized_data = serializers.serialize(
            "json", user.manage_somoims.all())
        return HttpResponse(serialized_data)
    else:
        return HttpResponse(status=405)


def like_somoim(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        serialized_data = serializers.serialize(
            "json", user.like_somoims.all())
        return HttpResponse(serialized_data)

    elif request.method == 'PUT':
        # toggle user's like status for requested somoim
        body = request.body.decode()
        somoim_id = json.loads(body)['somoim_id']

        if user.like_somoims.get(id=somoim_id) is None:
            user.like_somoims.add(Club.objects.get(id=somoim_id))
        else:
            user.like_somoims.remove(user.like_somoims.get(id=somoim_id))
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def join_somoim(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=id)
    except (ObjectDoesNotExist):
        return HttpResponseNotFound()

    if request.method == 'GET':
        serialized_data = serializers.serialize(
            "json", user.join_somoims.all())
        return HttpResponse(serialized_data)

    else:
        return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
