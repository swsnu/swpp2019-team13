from django.contrib import admin
from club4u.models import *
from club4u.application_models import *

# Register your models here.

admin.site.register(Club)
admin.site.register(Somoim)
admin.site.register(UserProfile)
admin.site.register(Tag)
admin.site.register(Category)
admin.site.register(Department)
admin.site.register(Major)
admin.site.register(PreClub)
admin.site.register(ClubPoster)
admin.site.register(Application)
admin.site.register(ShortTextForm)
admin.site.register(LongTextForm)
admin.site.register(MultiChoiceForm)
admin.site.register(Choice)
admin.site.register(ImageForm)
admin.site.register(FileForm)
