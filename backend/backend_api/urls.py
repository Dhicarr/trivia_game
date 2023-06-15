from backend_api.views import LeaderboardViewSet
from rest_framework.routers import DefaultRouter
from backend_api import views

router = DefaultRouter()
router.register(r'leaderboard', views.LeaderboardViewSet, basename='leaderboard')
urlpatterns = router.urls
