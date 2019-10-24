from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Club(models.Model):
  name = models.CharField(max_length=64)
  summary = models.TextField(default = "")
  description = models.TextField(default = "")
  category = models.IntegerField()
  isRegistered = models.BooleanField(default = False)