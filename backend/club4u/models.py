from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Tag(models.Model):
  name = models.CharField(max_length=64)

class Department(models.Model):
  name = models.CharField(max_length=64)

class Category(models.Model):
  name = models.CharField(max_length=64)

class UserProfile(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  dept_name = models.ForeignKey(
    Department,
    on_delete=models.CASCADE,
    related_name='user_dept_name'
  )
  grade = models.IntegerField()
  available_semester = models.IntegerField()

class Club(models.Model):
  name = models.CharField(max_length=64)
  summary = models.TextField(default = "")
  description = models.TextField(default = "")
  category = models.ForeignKey(
    Category,
    on_delete=models.CASCADE,
    related_name='club_category'
  )
  isRegistered = models.BooleanField(default = False)
  likes = models.IntegerField(default=0)

class Somoim(models.Model):
  title = models.CharField(max_length=64)
  summary = models.TextField(default = "")
  author = user_id = models.ForeignKey(
    UserProfile,
    on_delete=models.CASCADE,
    related_name='somoim_author'
  )
  description = models.TextField(default = "")
  category = models.ForeignKey(
    Category,
    on_delete=models.CASCADE,
    related_name='somoim_category'
  )
  goalJoiner = models.IntegerField(default=0)
  currentJoiner = models.IntegerField(default=0)
  likes = models.IntegerField(default=0)

class UserLikeClub(models.Model):
  user_id = models.ForeignKey(
    UserProfile,
    on_delete=models.CASCADE,
    related_name='userlikeclub_user_id'
  )
  club_id = models.ForeignKey(
    Club,
    on_delete=models.CASCADE,
    related_name='userlikeclub_club_id'
  )

class UserApplyClub(models.Model):
  user_id = models.ForeignKey(
    UserProfile,
    on_delete=models.CASCADE,
    related_name='userapplyclub_user_id'
  )
  club_id = models.ForeignKey(
    Club,
    on_delete=models.CASCADE,
    related_name='userapplyclub_club_id'
  )

class UserLikeSomoim(models.Model):
  user_id = models.ForeignKey(
    UserProfile,
    on_delete=models.CASCADE,
    related_name='userlikesomoim_user_id'
  )
  somoim_id = models.ForeignKey(
    Somoim,
    on_delete=models.CASCADE,
    related_name='userlikesomoim_somoim_id'
  )

class UserJoinSomoim(models.Model):
  user_id = models.ForeignKey(
    UserProfile,
    on_delete=models.CASCADE,
    related_name='userjoinsomoim_user_id'
  )
  somoim_id = models.ForeignKey(
    Somoim,
    on_delete=models.CASCADE,
    related_name='userjoinsomoim_somoim_id'
  )