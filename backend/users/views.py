from django.shortcuts import render

# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
def login_view(request):
  username = request.data.get('username')
  password = request.data.get('password')

  user = authenticate(username=username, password=password)
  
  if user:
    serializer = UserSerializer(user)
    return Response(serializer.data)
  return Response({'error': 'Invalid credentials'}, status=400)