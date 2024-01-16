from .models import User, Post, Follower, Like
from django.http import JsonResponse
from .serializers import PostSerializer


import json

class InvalidMethodError(Exception):
    pass
class NoPostsYet(Exception):
    pass
class ErrorCreatingPost(Exception):
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

        if self.request.method != "POST":
            raise InvalidMethodError("Only POST methods permitted!")
        
        post = json.loads(self.request.body) 
        serializer = PostSerializer(data=post)
        if serializer.is_valid():
            serializer.save(owner=self.user)
            return {"message": "Post created successfully!"}
        raise ErrorCreatingPost(serializer.errors)

        # post_content = data.get("postContent", "")
        # post = Post(owner=self.user, content=post_content)
        # post.save()
    
    def get_posts_for_you(self):
        try:
            posts_query_set = Post.objects.all().order_by('-date_released')
        except Post.DoesNotExist:
            raise NoPostsYet("No posts Yet!!")
        
    
        serializer = PostSerializer(posts_query_set, many=True)
        
        posts = serializer.data
        
        for post in posts:
            if Follower.objects.filter(followed_id=post["owner"]["id"], follower=self.user).exists():
                post["isFollowed"] = True
            else:
                post["isFollowed"] = False
                
        for post in posts:
            if Like.objects.filter(liked_by=self.user, liked_post_id=post["id"]).exists():
                post["isLiked"] = True
            else:
                post["isLiked"] = False
                
            likes_count = Like.objects.filter(liked_post_id=post["id"]).count()
            post["likes"] =  likes_count
            
        return posts
            
    def get_posts_following(self):
        try:
            # Get all users that the request.user is following
            followed_users = Follower.objects.filter(follower=self.user).values_list('followed', flat=True)

            # Get all posts of the users that the request.user is following
            followed_posts = Post.objects.filter(owner__in=followed_users)
        except Follower.DoesNotExist:
            raise NoPostsYet("No posts Yet!!")
        
    
        serializer = PostSerializer(followed_posts, many=True)
        
        posts = serializer.data
        
        for post in posts:
            if Follower.objects.filter(followed_id=post["owner"]["id"], follower=self.user).exists():
                post["isFollowed"] = True
            else:
                post["isFollowed"] = False
                
        for post in posts:
            if Like.objects.filter(liked_by=self.user, liked_post_id=post["id"]).exists():
                post["isLiked"] = True
            else:
                post["isLiked"] = False
                
            likes_count = Like.objects.filter(liked_post_id=post["id"]).count()
            post["likes"] =  likes_count
        
         
        return posts
    
    