from django.db import models
from django.contrib.postgres.fields import ArrayField
from .models import Club, Somoim, UserProfile

# Create your models here.


class ShortTextForm(models.Model):
    order = models.IntegerField(default=0)
    content = models.CharField(max_length=100)


class LongTextForm(models.Model):
    order = models.IntegerField(default=0)
    content = models.CharField(max_length=500)


# class Choice(models.Model):
#     content = models.CharField(max_length=100)
class MultiChoiceForm(models.Model):
    order = models.IntegerField(default=0)
    choice = ArrayField(models.CharField(max_length=100))


class ImageForm(models.Model):
    order = models.IntegerField(default=0)
    content = models.ImageField(null=True)


class FileForm(models.Model):
    order = models.IntegerField(default=0)
    content = models.FileField(null=True)


class ApplicationForm(models.Model):
    club = models.OneToOneField(Club, on_delete=models.CASCADE)
    short_texts = models.OneToManyField(ShortTextForm)
    long_texts = models.OneToManyField(LongTextForm)
    multi_choices = models.OneToManyField(MultiChoiceForm)
    images = models.OneToManyField(ImageForm)
    files = models.OneToManyField(FileForm)
