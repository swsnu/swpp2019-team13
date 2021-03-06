from django.db import models
from django.contrib.auth.models import User
from django.core.cache import cache

from django.db.models.signals import m2m_changed


# Create your models here.


class Tag(models.Model):
    name = models.CharField(max_length=64)
    suggested = models.IntegerField(default=1)
    selected = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        cache.delete('cached_tag')
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_tag')
    #     super().delete(*args, **kwargs)


class Category(models.Model):
    name = models.CharField(max_length=64)

    def save(self, *args, **kwargs):
        cache.delete('cached_category')
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_category')
    #     super().delete(*args, **kwargs)


class Department(models.Model):
    name = models.CharField(max_length=64)

    def save(self, *args, **kwargs):
        cache.delete('cached_dept')
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_dept')
    #     super().delete(*args, **kwargs)


class Major(models.Model):
    dept = models.ForeignKey(
        Department,
        on_delete=models.CASCADE,
        related_name='major_dept',
        null=True
    )
    name = models.CharField(max_length=64)

    def save(self, *args, **kwargs):
        cache.delete('cached_major')
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_major')
    #     super().delete(*args, **kwargs)


class PreClub(models.Model):
    name = models.CharField(max_length=64)
    manager = models.CharField(max_length=64)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='preclub_category'
    )
    auth_img = models.ImageField(null=True)

    tags = models.ManyToManyField(
        Tag,
        related_name="pre_clubs",
        blank=True
    )


class Club(models.Model):
    name = models.CharField(max_length=64)
    isShow = models.BooleanField(default=False)
    summary = models.TextField(default="")
    description = models.TextField(default="")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE
    )
    available_semester = models.IntegerField(default=0)
    available_major = models.ManyToManyField(
        Major,
        related_name="club_available_major",
        blank=True
    )
    session_day = models.IntegerField(default=0)
    recruit_start_day = models.DateField(null=True)
    recruit_end_day = models.DateField(null=True)
    tags = models.ManyToManyField(
        Tag,
        related_name="clubs",
        blank=True
    )
    member = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        cache.delete('cached_club')
        cache.delete('cached_club'+str(self.id))
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_club')
    #     super().delete(*args, **kwargs)


class ClubPoster(models.Model):
    img = models.ImageField()
    club = models.ForeignKey(
        Club,
        on_delete=models.CASCADE,
        related_name='club_poster'
    )
    point0 = models.IntegerField(default=0)
    point1 = models.IntegerField(default=0)
    point2 = models.IntegerField(default=0)


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
    available_semester = models.IntegerField(default=0)
    available_major = models.ManyToManyField(
        Major,
        related_name="somoim_available_major",
        blank=True
    )
    session_day = models.IntegerField(default=0)
    tags = models.ManyToManyField(
        Tag,
        related_name="somoims",
        blank=True
    )
    member = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        cache.delete('cached_somoim')
        cache.delete('cached_somoim'+str(self.id))
        super().save(*args, **kwargs)

    # def delete(self, *args, **kwargs):
    #     cache.delete('cached_somoim')
    #     super().delete(*args, **kwargs)


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
    available_session_day = models.IntegerField(default=0)

    manage_clubs = models.ManyToManyField(
        Club,
        related_name="managers",
        blank=True
    )
    like_clubs = models.ManyToManyField(
        Club,
        related_name="likers",
        blank=True
    )
    apply_clubs = models.ManyToManyField(
        Club,
        related_name="appliers",
        blank=True
    )

    manage_somoims = models.ManyToManyField(
        Somoim,
        related_name="managers",
        blank=True
    )
    like_somoims = models.ManyToManyField(
        Somoim,
        related_name="likers",
        blank=True
    )
    join_somoims = models.ManyToManyField(
        Somoim,
        related_name="joiners",
        blank=True
    )


def user_changed(sender, **kwargs):
    cache.delete('cached_recommended_club')
    cache.delete('cached_recommended_somoim')


m2m_changed.connect(user_changed, sender=UserProfile.like_clubs.through)
m2m_changed.connect(user_changed, sender=UserProfile.like_somoims.through)
