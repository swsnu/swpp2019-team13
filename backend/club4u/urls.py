from django.urls import path
from club4u import views

urlpatterns = [
    path('club/list', views.club_list, name='club_lilst'),
    path('somoim/list', views.somoim_list, name='somoim_list'),
]