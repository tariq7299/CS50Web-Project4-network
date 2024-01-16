from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    first_name = models.CharField(max_length=50, blank=False)
    last_name = models.CharField(max_length=50, blank=False)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
    
class Follower(models.Model):
    followed = models.ForeignKey(User, related_name='followed', on_delete=models.CASCADE) 
    follower = models.ForeignKey(User, related_name='follower', on_delete=models.CASCADE)

class Post(models.Model):
    date_released = models.DateTimeField(auto_now_add=True)  
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    
    # THis is a vary basic way to serialize a model
    
    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "date": self.date_released.strftime("%b %d %Y, %I:%M %p"),
    #         "owner": self.owner,
    #         "content": self.content
    #     }

    def __str__(self):
        return self.owner.first_name + ' ' + self.date_released.strftime("%b %d %Y, %I:%M %p")
    
class Like(models.Model):
    date_liked = models.DateTimeField(auto_now_add=True)  
    liked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
