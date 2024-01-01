from .models import User, Post, Follower, Like
from django.http import JsonResponse
from .serializers import PostSerializer


import json

class InvalidMethodError(Exception):
    pass
class NoPostsYet(Exception):
    pass

class PostHandler():
    def __init__(self, request):
        self.request = request
        # this should be replaced with request.user
        self.user = User.objects.get(id=1)
        
    # @property
    # def request(self):
    #     return self._request
    
    # @request.setter
    # def request(self, request):
    #     if request.method != "POST":
    #         raise InvalidMethodError("Only POST methods permitted!")
    #     self._request = request
        
    def save_new_post(self):
        post = json.loads(self.request.body) 
        serializer =  PostSerializer(data=post)
        if serializer.is_valid():
            serializer.save()
            return {"message": "Post created successfully!"}
        # post_content = data.get("postContent", "")
        # post = Post(owner=self.user, content=post_content)
        post.save()
        return JsonResponse({"message": "Post created successfully!"})
    
    def get_posts_for_you(self):
        try:
            posts_query_set = Post.objects.exclude(owner_id=1).order_by('-date_released')
        except Post.DoesNotExist:
            raise NoPostsYet("Only POST methods permitted!")
        
        posts_query_set = Post.objects.exclude(owner=self.user).order_by('-date_released')
    
        serializer = PostSerializer(posts_query_set, many=True)

        return serializer.data
    
    