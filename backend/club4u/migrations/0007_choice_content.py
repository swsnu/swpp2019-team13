# Generated by Django 2.2.5 on 2019-11-13 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0006_application_choice_fileform_imageform_longtextform_multichoiceform_shorttextform'),
    ]

    operations = [
        migrations.AddField(
            model_name='choice',
            name='content',
            field=models.CharField(default='tt', max_length=100),
            preserve_default=False,
        ),
    ]
