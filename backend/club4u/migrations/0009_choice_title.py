# Generated by Django 2.2.5 on 2019-11-18 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0008_auto_20191113_1837'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='title',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]