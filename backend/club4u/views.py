from django.http import JsonResponse, HttpResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from json import JSONDecodeError
from .models import UserProfile, Club, Somoim
from django.contrib.auth import login, authenticate, logout
from django.core.exceptions import ObjectDoesNotExist

# api/user/signup
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = User.objects.create_user(username=username, password=password)
        article = Article(user=user, content=article_content, author=acc_user)
        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)

# api/club/list
def club_list(request):
    if request.method == 'GET':
        response_dict = [club for club in Club.objects.all().values()]
        return JsonResponse(response_dict, safe=False)
    else:
        return HttpResponse(status=405)


# api/somoim/list
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
            article = Article(title=article_title, content=article_content, author=acc_user)
            article.save()
            response_dict = {'id' : article.id, 'title' : article.title, 'content' : article.content, 'author' : article.author_id}
            return JsonResponse(response_dict, status=201)
        except (KeyError, JSONDecodeError):
            return HttpResponse(status=400)
    else:
        return HttpResponse(status=405)
