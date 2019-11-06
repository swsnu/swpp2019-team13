# Generated by Django 2.2.6 on 2019-11-06 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='somoim',
            name='selected_dept',
        ),
        migrations.AddField(
            model_name='club',
            name='available_major',
            field=models.ManyToManyField(blank=True, related_name='club_available_major', to='club4u.Major'),
        ),
        migrations.AddField(
            model_name='club',
            name='available_semester',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='club',
            name='session_day',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='somoim',
            name='available_major',
            field=models.ManyToManyField(blank=True, related_name='somoim_available_major', to='club4u.Major'),
        ),
        migrations.AddField(
            model_name='somoim',
            name='session_day',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='available_session_day',
            field=models.IntegerField(default=0),
        ),
    ]
