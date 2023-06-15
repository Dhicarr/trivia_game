from django.shortcuts import render
from .models import Leaderboard
from .serializers import LeaderboardSerializer
from rest_framework import viewsets

# Create your views here.
class LeaderboardViewSet(viewsets.ModelViewSet):
    serializer_class = LeaderboardSerializer
    queryset = Leaderboard.objects.order_by('-score')[:5]
