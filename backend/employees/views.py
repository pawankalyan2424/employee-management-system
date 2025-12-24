from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Employee
from .serializers import EmployeeSerializer
from .permissions import IsAdmin



class EmployeeViewSet(viewsets.ModelViewSet):
  queryset = Employee.objects.all()
  serializer_class = EmployeeSerializer
  def get_permissions(self):
        if self.action in ['list', 'create', 'update', 'destroy']:
            permission_classes = [IsAuthenticated, IsAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
  
  
@api_view(['GET', 'PUT'])
def my_profile(request):
    employee = Employee.objects.get(user=request.user)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = EmployeeSerializer(
            employee,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)