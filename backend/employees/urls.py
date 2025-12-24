from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet,  my_profile


router = DefaultRouter()
router.register('employees', EmployeeViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('employees/me/', my_profile),
]
