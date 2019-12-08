from django.urls import path
from club4u import views

urlpatterns = [
    path('token/', views.token, name='token'),

    path('category/list/', views.category_list, name='category_list'),
    path('tag/list/', views.tag_list, name='tag_list'),
    path('tag/extlist/', views.tag_extlist, name='tag_extlist'),
    path('dept/list/', views.dept_list, name='dept_list'),
    path('major/list/', views.major_list, name='major_list'),

    path('user/list/', views.user_list, name='user_list'),

    path('user/signin/', views.signin, name='signin'),
    path('user/signup/', views.signup, name='signup'),
    path('user/signout/', views.signout, name='signout'),
    path('user/logininfo/', views.logininfo, name='logininfo'),
    path('user/info/', views.userinfo, name='userinfo'),

    path('preclub/list/', views.preclub_list, name='preclub'),
    path('club/<int:club_id>/poster/', views.clubposter, name='clubposter'),
    path('club/<int:club_id>/', views.club, name='club'),
    path('club/<int:club_id>/hits', views.clubhit, name='clubhit'),
    path('club/list/', views.club_list, name='club_list'),
    path('somoim/list/', views.somoim_list, name='somoim_list'),
    path('somoim/<int:somoim_id>/', views.somoim, name='somoim'),
    path('somoim/<int:somoim_id>/hits', views.somoimhit, name='somoimhit'),

    path('user/<int:user_id>/club/manage/',
         views.manage_club, name='manage_club'),
    path('user/<int:user_id>/club/like/', views.like_club, name='like_club'),
    path('user/<int:user_id>/club/apply/', views.apply_club, name='apply_club'),
    path('user/<int:user_id>/club/recommend/',
         views.recommend_club, name='recommend_club'),

    path('user/<int:user_id>/somoim/manage/',
         views.manage_somoim, name='manage_somoim'),
    path('user/<int:user_id>/somoim/like/',
         views.like_somoim, name='like_somoim'),
    path('user/<int:user_id>/somoim/join/',
         views.join_somoim, name='join_somoim'),
    path('user/<int:user_id>/somoim/recommend/',
         views.recommend_somoim, name='recommend_somoim'),

    path('club/<int:club_id>/application/',
         views.application, name='application'),
    path('club/<int:club_id>/application/form/',
         views.application_form, name='application_form'),
    path('club/<int:club_id>/application/list/',
         views.application_list, name='application_list'),
]
