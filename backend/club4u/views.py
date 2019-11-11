import json
from json import JSONDecodeError
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.renderers import JSONRenderer
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist
from .models import UserProfile, PreClub, Club, Somoim, Tag, Department, Category, Major
from .serializers import ClubSerializer, SomoimSerializer


def category_list(request):
    if request.method == 'GET':
        response_dict = [
            category for category in Category.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def tag_list(request):
    if request.method == 'GET':
        response_dict = [tag for tag in Tag.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def dept_list(request):
    if request.method == 'GET':
        response_dict = [dept for dept in Department.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def major_list(request):
    if request.method == 'GET':
        response_dict = [major for major in Major.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def user_list(request):
    if request.method == 'GET':
        response_dict = [user for user in UserProfile.objects.all().values()]
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
            available_session_day = req_data['available_session_day']
            user = User.objects.create_user(
                username=email, password=password, last_name=name)
            user.save()
            userprofile = UserProfile(user=user, dept=dept,
                                      major=major, grade=grade, available_semester=available_semester)
            userprofile.available_session_day = available_session_day
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
    else:
        return HttpResponse(status=405)


def logininfo(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            current_user = request.user
            userprofile = UserProfile.objects.get(user_id=current_user)
            response_dict = {'id': userprofile.id, 'name': current_user.last_name, 'email': current_user.username,
                             'dept': userprofile.dept.id, 'major': userprofile.major.id, 'grade': userprofile.grade,
                             'available_semester': userprofile.available_semester, 'available_session_day': userprofile.available_session_day}
            return JsonResponse(response_dict, safe=False)
        else:
            return JsonResponse(None, safe=False)
    else:
        return HttpResponse(status=405)


def userinfo(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'PUT':
        body = request.body.decode()
        name = json.loads(body)['name']
        dept = json.loads(body)['dept']
        major = json.loads(body)['major']
        grade = json.loads(body)['grade']
        available_semester = json.loads(body)['available_semester']
        available_session_day = json.loads(body)['available_session_day']

        user_profile = UserProfile.objects.get(user_id=request.user)
        user_profile.user.last_name = name
        user_profile.user.save()
        user_profile.dept = Department.objects.get(id=dept)
        user_profile.major = Major.objects.get(id=major)
        user_profile.grade = grade
        user_profile.available_semester = available_semester
        user_profile.available_session_day = available_session_day
        user_profile.save()

        response_dict = {'id': request.user.id, 'name': name, 'email': request.user.username,
                         'dept': dept, 'major': major, 'grade': grade,
                         'available_semester': available_semester,
                         'available_session_day': available_session_day}
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


def preclub_list(request):
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


def club_list(request):
    if request.method == 'GET':
        serializer = ClubSerializer(Club.objects.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponse(status=405)


def somoim_list(request):
    if request.method == 'GET':
        serializer = SomoimSerializer(Somoim.objects.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())
        title = req_data['title']
        summary = req_data['summary']
        description = req_data['description']
        category_id = req_data['category']
        goalJoiner = req_data['goalJoiner']
        available_major_id_list = req_data['available_major']
        available_semester = req_data['available_semester']
        session_day = req_data['session_day']

        category = Category.objects.get(id=category_id)

        # TODO : Add Tag
        somoim = Somoim()
        somoim.title = title
        somoim.category = category
        somoim.summary = summary
        somoim.description = description
        somoim.goalJoiner = goalJoiner
        somoim.available_semester = available_semester
        somoim.session_day = session_day

        somoim.save()

        for major_id in available_major_id_list:
            somoim.available_major.add(Major.objects.get(id=major_id))

        serializer = SomoimSerializer(Somoim.objects.get(id=somoim.id))

        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PUT':
        req_data = json.loads(request.body.decode())
        try:
            Somoim.objects.get(id=req_data['id'])
            return HttpResponse(status=200)
        except Somoim.DoesNotExist:
            return HttpResponseNotFound()
    else:
        return HttpResponse(status=405)


def manage_club(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = ClubSerializer(user.manage_clubs.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponse(status=405)


def like_club(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = ClubSerializer(user.like_clubs.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))

    elif request.method == 'PUT':
        body = request.body.decode()
        club_id = json.loads(body)['id']
        try:
            user.like_clubs.get(id=club_id)
            user.like_clubs.remove(user.like_clubs.get(id=club_id))
        except ObjectDoesNotExist:
            user.like_clubs.add(Club.objects.get(id=club_id))
        return HttpResponse({"likes": user.like_clubs.count()})

    else:
        return HttpResponse(status=405)


def apply_club(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = ClubSerializer(user.apply_clubs.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PUT':
        body = request.body.decode()
        club_id = json.loads(body)['id']
        try:
            user.apply_clubs.get(id=club_id)
            user.apply_clubs.remove(user.apply_clubs.get(id=club_id))
        except ObjectDoesNotExist:
            user.apply_clubs.add(Club.objects.get(id=club_id))

        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def recommend_club(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse([])
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        recommended_clubs = Club.objects.none()
        for user_like_club in user.like_clubs.all():
            for liker in user_like_club.likers.all():
                for club in liker.like_clubs.all():
                    if recommended_clubs.filter(id=club.id).count() == 0:
                        recommended_clubs |= Club.objects.filter(id=club.id)
        serializer = ClubSerializer(recommended_clubs, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponse(status=405)


def manage_somoim(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = SomoimSerializer(user.manage_somoims.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))

    elif request.method == 'PUT':
        body = request.body.decode()
        somoim_id = json.loads(body)['id']
        try:
            user.manage_somoims.get(id=somoim_id)
            user.manage_somoims.remove(user.manage_somoims.get(id=somoim_id))
        except ObjectDoesNotExist:
            user.manage_somoims.add(Somoim.objects.get(id=somoim_id))
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def like_somoim(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = SomoimSerializer(user.like_somoims.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))

    elif request.method == 'PUT':
        body = request.body.decode()
        somoim_id = json.loads(body)['id']
        try:
            user.like_somoims.get(id=somoim_id)
            user.like_somoims.remove(user.like_somoims.get(id=somoim_id))
        except ObjectDoesNotExist:
            user.like_somoims.add(Somoim.objects.get(id=somoim_id))
        return HttpResponse(status=204)

    else:
        return HttpResponse(status=405)


def join_somoim(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = SomoimSerializer(user.join_somoims.all(), many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PUT':
        body = request.body.decode()
        somoim_id = json.loads(body)['id']
        try:
            user.join_somoims.get(id=somoim_id)
            user.join_somoims.remove(user.join_somoims.get(id=somoim_id))
        except ObjectDoesNotExist:
            user.join_somoims.add(Somoim.objects.get(id=somoim_id))
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def recommend_somoim(request, user_id=0):
    if not request.user.is_authenticated:
        return HttpResponse([])
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        recommended_somoims = Somoim.objects.none()
        for user_like_somoim in user.like_somoims.all():
            for liker in user_like_somoim.likers.all():
                for somoim in liker.like_somoims.all():
                    if recommended_somoims.filter(id=somoim.id).count() == 0:
                        recommended_somoims |= Somoim.objects.filter(
                            id=somoim.id)
        serializer = SomoimSerializer(recommended_somoims, many=True)
        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
