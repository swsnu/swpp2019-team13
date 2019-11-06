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

def tag_list(request):
    if request.method == 'GET':
        response_dict = [tag for tag in Tag.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)

def category_list(request):
    if request.method == 'GET':
        response_dict = [category for category in Category.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
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


def club_edit(request, id=0):
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        else:
            try:
                selected_club = Club.objects.get(id=id)
            except Club.DoesNotExist:
                return HttpResponseNotFound()

            try:
                req_data = json.loads(request.body.decode())
                likes = req_data['likes']
            except (KeyError, json.decoder.JSONDecodeError):
                return HttpResponseBadRequest()

            selected_club.likes = likes
            selected_club.save()

            response_dict = {
                'id': selected_club.id
            }

            return JsonResponse(response_dict)


def somoim_list(request):
    if request.method == 'GET':
        response_dict = [somoim for somoim in Somoim.objects.all()]
        serialized_data = serializers.serialize("json", response_dict)
        return HttpResponse(serialized_data)
    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        summary = req_data['summary']
        description = req_data['description']
        goalJoiner = req_data['goalJoiner']
        available_semester = req_data['available_semester']
        category = Category.objects.get(id=1)
        selected_dept = Department.objects.get(id=1)
        tags = Tag.objects.get(id=1)
        somoim = Somoim()
      
        somoim.category=category
        somoim.title = title
        somoim.summary = summary
        somoim. goalJoiner = goalJoiner
        somoim.available_semester = available_semester
        somoim.currentJoiner=0
        somoim.likes=0
        somoim.description=description
        somoim.save()
        somoim.tags.add(1,2)
        somoim.selected_dept.add(1,2)
        return HttpResponse(status=201)
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        try:
            selected_somoim = Somoim.objects.get(id=req_data['id'])
        except Somoim.DoesNotExist:
            return HttpResponseNotFound()
    else:
        return HttpResponse(status=405)


def somoim_edit(request, id=0):
    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        else:
            try:
                selected_somoim = Somoim.objects.get(id=id)
            except Somoim.DoesNotExist:
                return HttpResponseNotFound()

            try:
                req_data = json.loads(request.body.decode())
                currentJoiner = req_data['currentJoiner']
                likes = req_data['likes']
            except (KeyError, json.decoder.JSONDecodeError):
                return HttpResponseBadRequest()

            selected_somoim.currentJoiner = currentJoiner
            selected_somoim.likes = likes
            selected_somoim.save()

            response_dict = {
                'id': selected_somoim.id
            }

            return JsonResponse(response_dict)


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


def information(request, id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'PUT':
        body = request.body.decode()
        name = json.loads(body)['name']
        email = json.loads(body)['email']
        dept = json.loads(body)['dept']
        major = json.loads(body)['major']
        grade = json.loads(body)['grade']
        available_semester = json.loads(body)['available_semester']

        user_profile = UserProfile.objects.get(user_id=request.user)
        user_profile.user.last_name = name
        user_profile.user.save()
        user_profile.dept = Department.objects.get(id=dept)
        user_profile.major = Major.objects.get(id=major)
        user_profile.grade = grade
        user_profile.available_semester = available_semester
        user_profile.save()

        response_dict = {'id': request.user.id, 'name': name, 'email': email,
                         'dept': dept, 'major': major, 'grade': grade,
                         'available_semester': available_semester}
        return JsonResponse(response_dict, safe=False)
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
        req_data = json.loads(request.body.decode())

        club_id = req_data['id']
        club = Club.objects.filter(id=club_id)

        user.like_clubs.add(club[0])
        user.save()

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

        club_id = req_data['id']
        club = Club.objects.filter(id=club_id)

        user.apply_clubs.add(club[0])
        user.save()

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
        req_data = json.loads(request.body.decode())

        somoim_id = req_data['id']
        somoim = Somoim.objects.filter(id=somoim_id)

        user.like_somoims.add(somoim[0])
        user.save()

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
        somoim = Somoim.objects.filter(id=somoim_id)

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
