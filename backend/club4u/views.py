import json
import os
import math

from json import JSONDecodeError

from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework.renderers import JSONRenderer
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

from krwordrank.word import summarize_with_keywords

from .models import *
from .application_models import *
from .serializers import *
from .application_serializers import *

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


def tag_extlist(request):
    if request.method == 'POST':
        # min_count = 1
        # max_length = 10
        # wordrank_extractor = KRWordRank(min_count, max_length)
        req_data = json.loads(request.body.decode())
        response_tags = req_data['description']
        keywords = summarize_with_keywords([response_tags], min_count=5, max_length=10,
                                           beta=0.85, max_iter=20, stopwords={}, verbose=True)
        arr = sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:10]
        response_dict = {}
        word = list(map(lambda a: a[0], arr))
        num = list(map(lambda a: a[1], arr))

        # first select tag with highest value
        for i in range(0, 10):
            if len(word) == i:
                break
            # drop tag if it exists in list and selected ratio is lower than 0.5
            if Tag.objects.filter(name=word[i]).exists():
                tag = Tag.objects.get(name=word[i])
                if tag.selected != 0 and tag.suggested < tag.selected*2:
                    response_dict[word[i]] = num[i]
            else:
                response_dict[word[i]] = num[i]
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
    users = UserProfile.objects.all()
    if request.method == 'GET':
        app_array = []
        for item in users:
            app_array.append(UserProfileSerializer(item).data)
        return HttpResponse(JSONRenderer().render(app_array))
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
                userprofile = UserProfile.objects.get(user_id=user.id)
                response_dict = {'id': userprofile.id, 'name': user.last_name, 'email': user.username,
                                 'dept': userprofile.dept.id, 'major': userprofile.major.id, 'grade': userprofile.grade,
                                 'available_semester': userprofile.available_semester, 'available_session_day': userprofile.available_session_day}
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
            userprofile = UserProfile.objects.get(user_id=current_user.id)
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

        user_profile = UserProfile.objects.get(user_id=request.user.id)
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
        auth_img = req_data['auth_img']
        preclub = PreClub(
            name=name, manager=manager, category=category, auth_img=auth_img)
        preclub.save()
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)

def clubhit(request, club_id=None):
    if request.method == 'PUT':
        try:
            selected_club = Club.objects.get(id=club_id)

            if 'club{}'.format(club_id) not in request.session:
                request.session['club{}'.format(club_id)] = 1;
                selected_club.hits += 1
                selected_club.save()
                return HttpResponse(status=200)

            return HttpResponse(status=204)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    else:
        return HttpResponse(status=405)

def somoimhit(request, somoim_id=None):
    if request.method == 'PUT':
        try:
            if 'somoim{}'.format(somoim_id) not in request.session:
                request.session['somoim{}'.format(somoim_id)] = 1;
                selected_somoim = Somoim.objects.get(id=somoim_id)
                selected_somoim.hits += 1
                selected_somoim.save()
                return HttpResponse(status=200)

            return HttpResponse(status=204)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    else:
        return HttpResponse(status=405)

def club(request, club_id=None):
    if request.method == 'GET':
        try:
            selected_club = Club.objects.get(id=club_id)
            serializer = ClubSerializer(selected_club)

            poster_list = ClubPoster.objects.filter(
                club_id=selected_club.id).values()

            poster_img_list = []

            for poster in poster_list:
                poster_img_list.append(poster['img'])

            response_dict = serializer.data
            response_dict['poster_img'] = poster_img_list
            return HttpResponse(JSONRenderer().render(response_dict))
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    if request.method == 'PUT':
        try:
            selected_club = Club.objects.get(id=club_id)

            req_data = json.loads(request.body.decode())

            # Handle New Tag and link tag id
            selected_tag = req_data['selected_tag']

            for text in selected_tag:
                if Tag.objects.filter(name=text).exists():
                    tag = Tag.objects.get(name=text)
                    tag.suggested += 1
                    tag.selected += 1
                    tag.save()
                else:
                    tag = Tag(name=text, suggested=1, selected=1)
                    tag.save()

            removed_tag = req_data['removed_tag']

            for text in removed_tag:
                if Tag.objects.filter(name=text).exists():
                    tag = Tag.objects.get(name=text)
                    tag.suggested += 1
                    tag.save()
                else:
                    tag = Tag(name=text, suggested=1, selected=0)
                    tag.save()

            # Handle New Tag in tags

            tags = req_data['tags']
            for tag in tags:
                if not Tag.objects.filter(name=tag['text']).exists():
                    tag = Tag(name=tag['text'], suggested=1, selected=1)
                    tag.save()

            selected_club.tags.clear()

            for tag in tags:
                selected_club.tags.add(Tag.objects.get(name=tag['text']))

            # Edit other information
            selected_club.isShow = req_data['isShow']
            selected_club.name = req_data['name']
            selected_club.summary = req_data['summary']
            selected_club.description = req_data['description']
            selected_club.category = Category.objects.get(
                id=req_data['category'])
            selected_club.available_semester = req_data['available_semester']
            selected_club.session_day = req_data['session_day']

            selected_club.available_major.clear()

            for major_id in req_data['available_major']:
                selected_club.available_major.add(
                    Major.objects.get(id=major_id))

            # delete existing poster before add new poster
            poster_club = ClubPoster.objects.filter(club_id=selected_club.id)

            for poster in poster_club.values():
                file_path = os.getcwd() + "/media/" + str(poster['img'])
                if os.path.exists(file_path):
                    os.remove(file_path)

            poster_club.delete()

            selected_club.recruit_start_day = req_data['recruit_start_day'].split('T')[
                0]
            selected_club.recruit_end_day = req_data['recruit_end_day'].split('T')[
                0]

            selected_club.save()

            return HttpResponse(status=204)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    else:
        return HttpResponse(status=405)


def somoim(request, somoim_id=None):
    if request.method == 'GET':
        try:
            selected_somoim = Somoim.objects.get(id=somoim_id)
            serializer = SomoimSerializer(selected_somoim)
            response_dict = serializer.data
            return HttpResponse(JSONRenderer().render(response_dict))
        except ObjectDoesNotExist:
            return HttpResponse(status=404)
    else:
        return HttpResponse(status=405)


def clubposter(request, club_id=0):
    if request.method == 'POST':
        try:
            selectedClub = Club.objects.get(id=club_id)
            new_poster = ClubPoster(
                img=request.FILES['image'], club=selectedClub)
            new_poster.save()
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def club_list(request):
    if request.method == 'GET':
        serializer = ClubSerializer(Club.objects.all(), many=True)

        response_dict = serializer.data

        for c in response_dict:
            poster_list = ClubPoster.objects.filter(
                club_id=c['id']).values()

            poster_img_list = []
            for poster in poster_list:
                poster_img_list.append(poster['img'])

            c['poster_img'] = poster_img_list
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

        new_somoim = Somoim()
        new_somoim.title = title
        new_somoim.category = category
        new_somoim.summary = summary
        new_somoim.description = description
        new_somoim.goalJoiner = goalJoiner
        new_somoim.available_semester = available_semester
        new_somoim.session_day = session_day

        new_somoim.save()

        for major_id in available_major_id_list:
            new_somoim.available_major.add(Major.objects.get(id=major_id))

        serializer = SomoimSerializer(Somoim.objects.get(id=new_somoim.id))

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

        form = Application.objects.get(club_id=club_id, user=None)

        try:
            application = Application.objects.get(
                club=Club.objects.get(id=club_id), user=user)
        except ObjectDoesNotExist:
            application = Application(
                club=Club.objects.get(id=club_id), user=user)
            application.save()

            short_text_forms = ShortTextForm.objects.filter(
                application_id=form.id)
            long_text_forms = LongTextForm.objects.filter(
                application_id=form.id)
            multi_choice_forms = MultiChoiceForm.objects.filter(
                application_id=form.id)
            file_forms = FileForm.objects.filter(application_id=form.id)
            image_forms = ImageForm.objects.filter(application_id=form.id)
            for item in short_text_forms:
                short_text = ShortTextForm(
                    application_id=application.id, order=item.order, title=item.title)
                short_text.save()
            for item in long_text_forms:
                long_text = LongTextForm(
                    application_id=application.id, order=item.order, title=item.title)
                long_text.save()
            for item in multi_choice_forms:
                multi_choice = MultiChoiceForm(
                    application_id=application.id, order=item.order, title=item.title)
                multi_choice.save()
                choices = Choice.objects.filter(multi=item)
                for item_choice in choices:
                    choice = Choice(multi=multi_choice,
                                    title=item_choice.title, content=item_choice.content)
                    choice.save()
            for item in file_forms:
                file = FileForm(application_id=application.id,
                                order=item.order, title=item.title)
                file.save()
            for item in image_forms:
                image = ImageForm(application_id=application.id,
                                  order=item.order, title=item.title)
                image.save()
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def recommend_club(request, user_id=0):
    if not request.user.is_authenticated:
        unsorted_clubs = Club.objects.all()
        sorted_clubs = sorted(unsorted_clubs, key=lambda c: -c.likers.count())
        serializer = ClubSerializer(sorted_clubs, many=True)

        # ADD POSTER IMAGES TO EACH CLUB DATA
        response_dict = serializer.data
        for c in response_dict:
            poster_list = ClubPoster.objects.filter(
                club_id=c['id']).values()

            poster_img_list = []
            for poster in poster_list:
                poster_img_list.append(poster['img'])

            c['poster_img'] = poster_img_list

        return HttpResponse(JSONRenderer().render(serializer.data))

    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        # 1. get clubs which user likes
        target_liked_clubs = user.like_clubs.all()

        # 2. get users who likes club in above list
        candidates = set()
        for target_like_club in target_liked_clubs:
            for candidate in target_like_club.likers.all():
                if candidate.id is user.id:
                    continue
                candidates.add(candidate)

        # 3. calculate similarity between target user and each candidate user
        # by user-based collaborate filtering (CF)
        # use cosine similarity
        similarity_score = []
        target_already_liked = []
        club_counts = Club.objects.count()

        target_info = [0 for x in range(club_counts)]
        for target_like_club in target_liked_clubs:
            target_info[target_like_club.id - 1] = 1
            target_already_liked.append(target_like_club.id)

        for candidate in candidates:
            candidate_info = [0 for x in range(club_counts)]
            for candidate_like_club in candidate.like_clubs.all():
                candidate_info[candidate_like_club.id - 1] = 1

            (temp1, temp2, temp3) = (0, 0, 0)
            for i in range(club_counts):
                x = target_info[i]
                y = candidate_info[i]

                temp1 += (x * x)
                temp2 += (y * y)
                temp3 += (x * y)
            
            similarity_score.append(temp3 / (math.sqrt(temp1 * temp2)))

        # 4. calculate recommendation score of club by using above information
        recommendation_scores = [0 for x in range(club_counts)]
        candidate_index = 0
        for candidate in candidates:
            for candidate_like_club in candidate.like_clubs.all():
                if candidate_like_club.id in target_already_liked:
                    continue
                recommendation_scores[candidate_like_club.id - 1] += similarity_score[candidate_index]
            candidate_index += 1
        
        # 5. make recommendation list
        recommended_clubs = Club.objects.none()
        for x in range(club_counts // 2):
            index = recommendation_scores.index(max(recommendation_scores))
            if recommendation_scores[index] > 0:
                recommended_clubs |= Club.objects.filter(id=index+1)
            recommendation_scores[index] = 0

        if len(recommended_clubs) != 0:
            serializer = ClubSerializer(recommended_clubs, many=True)
        else:
            unsorted_clubs = Club.objects.all().exclude(id__in=target_already_liked)
            sorted_clubs = sorted(unsorted_clubs, key=lambda c: -c.likers.count())
            serializer = ClubSerializer(sorted_clubs, many=True)

        # ADD POSTER IMAGES TO EACH CLUB DATA
        response_dict = serializer.data
        for c in response_dict:
            poster_list = ClubPoster.objects.filter(
                club_id=c['id']).values()

            poster_img_list = []
            for poster in poster_list:
                poster_img_list.append(poster['img'])

            c['poster_img'] = poster_img_list

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
            user.join_somoims.add(Somoim.objects.get(id=somoim_id))
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
        unsorted_somoims = Somoim.objects.all()
        sorted_somoims = sorted(unsorted_somoims, key=lambda c: -c.likers.count())
        serializer = SomoimSerializer(sorted_somoims, many=True)

        return HttpResponse(JSONRenderer().render(serializer.data))
    try:
        user = UserProfile.objects.get(id=user_id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        # 1. get somoims which user likes
        target_liked_somoims = user.like_somoims.all()

        # 2. get users who likes somoim in above list
        candidates = set()
        for target_like_somoim in target_liked_somoims:
            for candidate in target_like_somoim.likers.all():
                if candidate.id is user.id:
                    continue
                candidates.add(candidate)

        # 3. calculate similarity between target user and each candidate user
        # by user-based collaborate filtering (CF)
        # use cosine similarity
        similarity_score = []
        target_already_liked = []
        somoim_counts = Somoim.objects.count()

        target_info = [0 for x in range(somoim_counts)]
        for target_like_somoim in target_liked_somoims:
            target_info[target_like_somoim.id - 1] = 1
            target_already_liked.append(target_like_somoim.id)

        for candidate in candidates:
            candidate_info = [0 for x in range(somoim_counts)]
            for candidate_like_somoim in candidate.like_somoims.all():
                candidate_info[candidate_like_somoim.id - 1] = 1

            (temp1, temp2, temp3) = (0, 0, 0)
            for i in range(somoim_counts):
                x = target_info[i]
                y = candidate_info[i]

                temp1 += (x * x)
                temp2 += (y * y)
                temp3 += (x * y)

            similarity_score.append(temp3 / (math.sqrt(temp1 * temp2)))

        # 4. calculate recommendation score of somoim by using above information
        recommendation_scores = [0 for x in range(somoim_counts)]
        candidate_index = 0
        for candidate in candidates:
            for candidate_like_somoim in candidate.like_somoims.all():
                if candidate_like_somoim.id in target_already_liked:
                    continue
                recommendation_scores[candidate_like_somoim.id -
                                      1] += similarity_score[candidate_index]
            candidate_index += 1

        # 5. make recommendation list
        recommended_somoims = Somoim.objects.none()
        for x in range(somoim_counts // 2):
            index = recommendation_scores.index(max(recommendation_scores))
            if recommendation_scores[index] > 0:
                recommended_somoims |= Somoim.objects.filter(id=index+1)
            recommendation_scores[index] = 0

        if len(recommended_somoims) != 0:
            serializer = SomoimSerializer(recommended_somoims, many=True)
        else:
            unsorted_somoims = Somoim.objects.all().exclude(id__in=target_already_liked)
            sorted_somoims = sorted(unsorted_somoims, key=lambda c: -c.likers.count())
            serializer = SomoimSerializer(sorted_somoims, many=True)

        return HttpResponse(JSONRenderer().render(serializer.data))
    else:
        return HttpResponse(status=405)


def application_form(request, club_id=0):
    # if not request.user.is_authenticated:
    #     return HttpResponse(401)
    try:
        form = Application.objects.get(club_id=club_id, user=None)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = ApplcationSerializer(form)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PUT':
        form.delete()
        form = Application(club=Club.objects.get(id=club_id))
        form.save()
        body = json.loads(request.body.decode())
        for item in body:
            if item['type'] == 'shortText':
                short_text = ShortTextForm(
                    application=form, order=item['order'], title=item['title'])
                short_text.save()
            elif item['type'] == 'longText':
                long_text = LongTextForm(
                    application=form, order=item['order'], title=item['title'])
                long_text.save()
            elif item['type'] == 'multiChoice':
                multi_choice = MultiChoiceForm(
                    application=form, order=item['order'], title=item['title'])
                multi_choice.save()
                for item_choice in item['choices']:
                    choice = Choice(multi=multi_choice,
                                    title=item_choice['title'])
                    choice.save()
            elif item['type'] == 'file':
                file = FileForm(
                    application=form, order=item['order'], title=item['title'])
                file.save()
            else:  # if item['type'] == 'image':
                image = ImageForm(
                    application=form, order=item['order'], title=item['title'])
                image.save()

        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def application(request, club_id=0):
    # if not request.user.is_authenticated:
    #     return HttpResponse(401)
    try:
        application = Application.objects.get(
            club_id=club_id, user_id=request.user.id)
    except ObjectDoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        serializer = ApplcationSerializer(application)
        return HttpResponse(JSONRenderer().render(serializer.data))
    elif request.method == 'PUT':
        application = Application.objects.get(
            club_id=club_id, user_id=request.user.id)
        body = json.loads(request.body.decode())
        for item in body:
            if item['type'] == 'shortText':
                short_text = ShortTextForm.objects.get(
                    application_id=application.id, order=item['order'])
                short_text.content = item['content']
                short_text.save()
            elif item['type'] == 'longText':
                long_text = LongTextForm.objects.get(
                    application_id=application.id, order=item['order'])
                long_text.content = item['content']
                long_text.save()
            elif item['type'] == 'multiChoice':
                multi_choice = MultiChoiceForm.objects.get(
                    application_id=application.id, order=item['order'])
                multi_choice.save()
                for item_choice in item['choices']:
                    choice = Choice.objects.get(multi=multi_choice,
                                                title=item_choice['title'])
                    choice.checked = item_choice['checked']
                    choice.save()
            else:
                continue

        return HttpResponse(status=204)
    elif request.method == "POST":
        images = request.FILES.getlist('image')
        for i in range(len(images)):
            image = ImageForm.objects.filter(application_id=application.id)[i]
            image.content = images[i]
            image.save()

        files = request.FILES.getlist('file')
        for i in range(len(files)):
            file = FileForm.objects.filter(application_id=application.id)[i]
            file.content = files[i]
            file.save()
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)


def application_list(request, club_id=0):
    # if not request.user.is_authenticated:
    #     return HttpResponse(401)
    applications = Application.objects.filter(
        club_id=club_id).exclude(user=None)
    if request.method == 'GET':
        app_array = []
        for item in applications:
            app_array.append(ApplcationSerializer(item).data)

        return HttpResponse(JSONRenderer().render(app_array))
    else:
        return HttpResponse(status=405)


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=405)
