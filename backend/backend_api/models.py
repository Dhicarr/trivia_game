from django.db import models

# Create your models here.
class Leaderboard(models.Model):
    name = models.CharField(max_length=250)
    score = models.CharField(max_length=3)
    category = models.CharField(max_length=350)

    def __str__(self):
        return self.name
