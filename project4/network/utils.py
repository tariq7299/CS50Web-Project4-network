from .models import User, Post, Follower, Like
from django.http import JsonResponse

import json

class InvalidMethodError(Exception):
    pass

class PostHandler():
    def __init__(self, request):
        self.request = request
        # this should be replaced with request.user
        self.user = User.objects.get(id=1)
    @property
    def request(self):
        return self._request
    
    @request.setter
    def request(self, request):
        if request.method != "POST":
            raise InvalidMethodError("Only POST methods permitted!")
        self._request = request
        
    def save_new_post(self):
        data = json.loads(self.request.body)        
        post_content = data.get("postContent", "")
        post = Post(owner=self.user, content=post_content)
        post.save()
        return JsonResponse({"message": "Post created successfully!"})
    