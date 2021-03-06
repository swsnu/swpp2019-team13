# Generated by Django 2.2.5 on 2019-11-13 17:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('club4u', '0005_auto_20191112_1313'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('club', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='club4u.Club')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='application', to='club4u.UserProfile')),
            ],
        ),
        migrations.CreateModel(
            name='ShortTextForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=100)),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='short_texts', to='club4u.Application')),
            ],
        ),
        migrations.CreateModel(
            name='MultiChoiceForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='multi_choices', to='club4u.Application')),
            ],
        ),
        migrations.CreateModel(
            name='LongTextForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('content', models.CharField(max_length=500)),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='long_texts', to='club4u.Application')),
            ],
        ),
        migrations.CreateModel(
            name='ImageForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('content', models.ImageField(blank=True, null=True, upload_to='')),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='club4u.Application')),
            ],
        ),
        migrations.CreateModel(
            name='FileForm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.IntegerField(default=0)),
                ('title', models.CharField(max_length=100)),
                ('content', models.FileField(blank=True, null=True, upload_to='')),
                ('application', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='files', to='club4u.Application')),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('multi', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='club4u.MultiChoiceForm')),
            ],
        ),
    ]
