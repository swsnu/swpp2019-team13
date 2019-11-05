# Generated by Django 2.2.5 on 2019-11-05 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0005_auto_20191104_1504'),
    ]

    operations = [
        migrations.AddField(
            model_name='club',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='clubs', to='club4u.Tag'),
        ),
        migrations.AddField(
            model_name='preclub',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='pre_clubs', to='club4u.Tag'),
        ),
        migrations.AddField(
            model_name='somoim',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='somoims', to='club4u.Tag'),
        ),
    ]