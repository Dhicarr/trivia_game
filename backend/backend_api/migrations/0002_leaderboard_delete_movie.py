# Generated by Django 4.2.2 on 2023-06-14 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Leaderboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('score', models.CharField(max_length=2)),
                ('category', models.CharField(max_length=350)),
            ],
        ),
        migrations.DeleteModel(
            name='Movie',
        ),
    ]
