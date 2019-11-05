# Generated by Django 2.2.5 on 2019-11-05 14:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Club',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('summary', models.TextField(default='')),
                ('description', models.TextField(default='')),
                ('poster_img', models.ImageField(null=True, upload_to='')),
                ('likes', models.IntegerField(default=0)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='club4u.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='Major',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('dept', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='major_dept', to='club4u.Department')),
            ],
        ),
        migrations.CreateModel(
            name='Somoim',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=64)),
                ('summary', models.TextField(default='')),
                ('description', models.TextField(default='')),
                ('goalJoiner', models.IntegerField(default=0)),
                ('currentJoiner', models.IntegerField(default=0)),
                ('likes', models.IntegerField(default=0)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='somoim_category', to='club4u.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grade', models.IntegerField(default=1)),
                ('available_semester', models.IntegerField(default=1)),
                ('apply_clubs', models.ManyToManyField(blank=True, related_name='appliers', to='club4u.Club')),
                ('dept', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_dept', to='club4u.Department')),
                ('join_somoims', models.ManyToManyField(blank=True, related_name='joiners', to='club4u.Somoim')),
                ('like_clubs', models.ManyToManyField(blank=True, related_name='likers', to='club4u.Club')),
                ('like_somoims', models.ManyToManyField(blank=True, related_name='likers', to='club4u.Somoim')),
                ('major', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_major', to='club4u.Major')),
                ('manage_clubs', models.ManyToManyField(blank=True, related_name='manager', to='club4u.Club')),
                ('manage_somoims', models.ManyToManyField(blank=True, related_name='manager', to='club4u.Somoim')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='somoim',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='somoims', to='club4u.Tag'),
        ),
        migrations.CreateModel(
            name='PreClub',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('manager', models.CharField(max_length=64)),
                ('auth_img', models.ImageField(null=True, upload_to='')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='preclub_category', to='club4u.Category')),
                ('tags', models.ManyToManyField(blank=True, related_name='pre_clubs', to='club4u.Tag')),
            ],
        ),
        migrations.AddField(
            model_name='club',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='clubs', to='club4u.Tag'),
        ),
    ]
