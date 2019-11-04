from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=64)


class Category(models.Model):
    name = models.CharField(max_length=64)


class Department(models.Model):
    name = models.CharField(max_length=64)


class Major(models.Model):
    dept = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='major_dept',
        null=True
    )
    name = models.CharField(max_length=64)


class PreClub(models.Model):
    name = models.CharField(max_length=64)
    manager = models.CharField(max_length=64)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='preclub_category'
    )
    auth_img = models.ImageField(null=True)


class Club(models.Model):
    name = models.CharField(max_length=64)
    summary = models.TextField(default="")
    description = models.TextField(default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )
    poster_img = models.ImageField(null=True)
    likes = models.IntegerField(default=0)


class Somoim(models.Model):
    title = models.CharField(max_length=64)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='somoim_category'
    )
    summary = models.TextField(default="")
    description = models.TextField(default="")
    goalJoiner = models.IntegerField(default=0)
    currentJoiner = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    dept = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='user_dept',
        null=True
    )
    major = models.ForeignKey(
        Major,
        on_delete=models.CASCADE,
        related_name='user_major',
        null=True
    )
    grade = models.IntegerField(default=1)
    available_semester = models.IntegerField(default=1)

    manage_clubs = models.ManyToManyField(
        Club,
        related_name="manager"
    )
    like_clubs = models.ManyToManyField(
        Club,
        related_name="likers"
    )
    apply_clubs = models.ManyToManyField(
        Club,
        related_name="appliers"
    )

    manage_somoims = models.ManyToManyField(
        Somoim,
        related_name="manager"
    )
    like_somoims = models.ManyToManyField(
        Somoim,
        related_name="likers"
    )
    join_somoims = models.ManyToManyField(
        Somoim,
        related_name="joiners"
    )


# class UserLikeClub(models.Model):
#     user = models.ForeignKey(
#         UserProfile,
#         on_delete=models.CASCADE,
#         related_name='userlikeclub_user_id'
#     )
#     club = models.ForeignKey(
#         Club,
#         on_delete=models.CASCADE,
#         related_name='userlikeclub_club_id'
#     )


# class UserApplyClub(models.Model):
#     user = models.ForeignKey(
#         UserProfile,
#         on_delete=models.CASCADE,
#         related_name='userapplyclub_user_id'
#     )
#     club = models.ForeignKey(
#         Club,
#         on_delete=models.CASCADE,
#         related_name='userapplyclub_club_id'
#     )


# class UserLikeSomoim(models.Model):
#     user = models.ForeignKey(
#         UserProfile,
#         on_delete=models.CASCADE,
#         related_name='userlikesomoim_user_id'
#     )
#     somoim = models.ForeignKey(
#         Somoim,
#         on_delete=models.CASCADE,
#         related_name='userlikesomoim_somoim_id'
#     )


# class UserJoinSomoim(models.Model):
#     user = models.ForeignKey(
#         UserProfile,
#         on_delete=models.CASCADE,
#         related_name='userjoinsomoim_user_id'
#     )
#     somoim = models.ForeignKey(
#         Somoim,
#         on_delete=models.CASCADE,
#         related_name='userjoinsomoim_somoim_id'
#     )
