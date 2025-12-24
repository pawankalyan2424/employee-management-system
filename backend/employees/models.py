from django.db import models

# Create your models here.
from  users.models import User

class Employee(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  name = models.CharField(max_length=100)
  email = models.EmailField(unique=True)
  phone = models.CharField(max_length=15)
  department = models.CharField(max_length=50)
  designation = models.CharField(max_length=50)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name