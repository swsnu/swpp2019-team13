from django.urls import path
from club4u import views

urlpatterns = [
    path('token/', views.token, name='token'),
    path('major/list/', views.major_list, name='major_list'),
    path('dept/list/', views.dept_list, name='dept_list'),
    path('user/signup/', views.signup, name='signup'),
    path('club/list/', views.club_list, name='club_list'),
    path('somoim/list/', views.somoim_list, name='somoim_list'),
]
