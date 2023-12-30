from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

class Follower(models.Model):
    followed = models.ForeignKey(User, related_name='followed', on_delete=models.CASCADE) 
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)

class Post(models.Model):
    date_released = models.DateTimeField(auto_now_add=True)  
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()

class Like(models.Model):
    date_liked = models.DateTimeField(auto_now_add=True)  
    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE)
