# Generated by Django 2.2.5 on 2019-11-12 13:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0004_auto_20191106_1757'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='club',
            name='poster_img',
        ),
        migrations.AddField(
            model_name='club',
            name='isShow',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='club',
            name='recruit_end_day',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='club',
            name='recruit_start_day',
            field=models.DateField(null=True),
        ),
        migrations.CreateModel(
            name='ClubPoster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='')),
                ('club', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='club_poster', to='club4u.Club')),
            ],
        ),
    ]
