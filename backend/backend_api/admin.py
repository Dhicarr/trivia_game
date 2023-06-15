from django.contrib import admin
from .models import Leaderboard
# Register your models here.

class LeaderboardAdmin(admin.ModelAdmin):
    list = ('name', 'score', 'category')

    admin.site.register(Leaderboard)
