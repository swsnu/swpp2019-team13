from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseNotFound, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from django.core import serializers


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
        return HttpResponse(status=400)
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
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        club_id = req_data['club_id']

        if user.apply_clubs.get(id=club_id) is None:
            user.apply_clubs.add(Club.objects.get(id=club_id))
        else:
            user.apply_clubs.remove(user.apply_clubs.get(id=club_id))
        return HttpResponse(status=204)
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
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())

        somoim_id = req_data['id']
        somoim = Somoim.objects.filter(id=somoim_id+1)

        user.join_somoims.add(somoim[0])
        user.save()

        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
