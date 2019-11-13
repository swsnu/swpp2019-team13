from django.db import models
from .models import Club, Somoim, UserProfile

# Create your models here.


class Application(models.Model):
    club = models.OneToOneField(Club, on_delete=models.CASCADE)
    user = models.ForeignKey(
        UserProfile,
        related_name='application',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )


class ShortTextForm(models.Model):
    application = models.ForeignKey(
        Application,
        related_name='short_texts',
        on_delete=models.CASCADE,
        null=True
    )
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=100)


class LongTextForm(models.Model):
    application = models.ForeignKey(
        Application,
        related_name='long_texts',
        on_delete=models.CASCADE,
        null=True
    )
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=500)


class MultiChoiceForm(models.Model):
    application = models.ForeignKey(
        Application,
        related_name='multi_choices',
        on_delete=models.CASCADE,
        null=True
    )
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)


class Choice (models.Model):
    multi = models.ForeignKey(
        MultiChoiceForm,
        related_name='choices',
        on_delete=models.CASCADE,
        null=True
    )
    content = models.CharField(max_length=100)


class ImageForm(models.Model):
    application = models.ForeignKey(
        Application,
        related_name='images',
        on_delete=models.CASCADE,
        null=True
    )
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.ImageField(null=True, blank=True)


class FileForm(models.Model):
    application = models.ForeignKey(
        Application,
        related_name='files',
        on_delete=models.CASCADE,
        null=True
    )
    order = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.FileField(null=True, blank=True)
