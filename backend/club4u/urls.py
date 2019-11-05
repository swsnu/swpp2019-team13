from django.urls import path
from club4u import views

urlpatterns = [
    path('token/', views.token, name='token'),

    path('major/list/', views.major_list, name='major_list'),
    path('dept/list/', views.dept_list, name='dept_list'),
    path('club/list/', views.club_list, name='club_list'),
    path('somoim/list/', views.somoim_list, name='somoim_list'),

    path('user/signin/', views.signin, name='signin'),
    path('user/signup/', views.signup, name='signup'),
    path('user/signout/', views.signout, name='signout'),
    path('user/list/', views.user_list, name='user_list'),
    path('user/logininfo/', views.logininfo, name='logininfo'),

    path('user/information/', views.information, name='information'),

    path('user/<int:id>/club/manage/', views.manage_club, name='manage_club'),
    path('user/<int:id>/club/like/', views.like_club, name='like_club'),
    path('user/<int:id>/club/apply/', views.apply_club, name='apply_club'),

    path('user/<int:id>/somoim/manage/',
         views.manage_somoim, name='manage_somoim'),
    path('user/<int:id>/somoim/like/', views.like_somoim, name='like_somoim'),
    path('user/<int:id>/somoim/apply/', views.join_somoim, name='join_somoim'),
]
