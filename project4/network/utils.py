from .models import User, Post, Follower, Like
from django.http import JsonResponse
from .serializers import PostSerializer
from django.core.paginator import Paginator


import json

class InvalidMethodError(Exception):
    pass
class NoPostsYet(Exception):
    pass
class NoUserWithThatUsername(Exception):
    pass
class ErrorCreatingPost(Exception):
    pass

class PostHandler():
    def __init__(self, request):
        self.request = request
        # this should be replaced with request.user
        # self.request.user = User.objects.get(id=1)
        
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
            serializer.save(owner=self.request.user)
            return {"message": "Post created successfully!"}
        raise ErrorCreatingPost(serializer.errors)

        # post_content = data.get("postContent", "")
        # post = Post(owner=self.request.user, content=post_content)
        # post.save()
    
    def get_posts_for_you(self, page_number):
        try:
            posts_query_set = Post.objects.all().order_by('-date_released')
        except Post.DoesNotExist:
            raise NoPostsYet("No posts Yet!!")
        
        paginator = Paginator(posts_query_set, 10).page(page_number)
        
        page_has_next = paginator.has_next()
        
        page_has_previous = paginator.has_previous()
        
        page_posts_query_set = paginator.object_list
        
        serializer = PostSerializer(page_posts_query_set, many=True)
        
        posts = serializer.data
        
        page = {"posts": posts, "page_has_next": page_has_next, "page_has_previous": page_has_previous}
        
        
        # print("tesstposts", page)
        
        # This was a logic related to a removed feature in my app (a follow button in every post)
        # for post in posts:
        #     if Follower.objects.filter(followed_id=post["owner"]["id"], follower=self.request.user).exists():
        #         post["isFollowed"] = True
        #     else:
        #         post["isFollowed"] = False
                
        for post in page["posts"]:
            if Like.objects.filter(liked_by=self.request.user, liked_post_id=post["id"]).exists():
                post["isLiked"] = True
            else:
                post["isLiked"] = False
                
            likes_count = Like.objects.filter(liked_post_id=post["id"]).count()
            post["likes"] =  likes_count
            
        
        return page
            
    def get_posts_following(self, page_number):
        try:
            # Get all users that the request.user is following
            followed_users = Follower.objects.filter(follower=self.request.user).values_list('followed', flat=True)

            # Get all posts of the users that the request.user is following
            followed_posts_query_set = Post.objects.filter(owner__in=followed_users)
        except Follower.DoesNotExist:
            raise NoPostsYet("No posts Yet!!")
        
        paginator = Paginator(followed_posts_query_set, 10).page(page_number)
        
        page_has_next = paginator.has_next()
        
        page_has_previous = paginator.has_previous()
        
        page_posts_query_set = paginator.object_list
        
        serializer = PostSerializer(page_posts_query_set, many=True)
        
        posts = serializer.data
        
        page = {"posts": posts, "page_has_next": page_has_next, "page_has_previous": page_has_previous}
        
        # This was a logic related to a removed feature in my app (a follow button in every post)
        # for post in posts:
        #     if Follower.objects.filter(followed_id=post["owner"]["id"], follower=self.request.user).exists():
        #         post["isFollowed"] = True
        #     else:
        #         post["isFollowed"] = False
                
        for post in posts:
            if Like.objects.filter(liked_by=self.request.user, liked_post_id=post["id"]).exists():
                post["isLiked"] = True
            else:
                post["isLiked"] = False
                
            likes_count = Like.objects.filter(liked_post_id=post["id"]).count()
            post["likes"] =  likes_count
        
         
        return page
    
    def get_posts_for_user_profile(self, username, page_number):
       
        try:
            requested_user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NoUserWithThatUsername("Wrong username!!")
        try:
            # print("requested_user", requested_user)
            posts_query_set = Post.objects.filter(owner=requested_user).order_by('-date_released')
        except Post.DoesNotExist:
            raise NoPostsYet("No posts Yet!!")
        
    
        paginator = Paginator(posts_query_set, 10).page(page_number)
        
        page_has_next = paginator.has_next()
        
        page_has_previous = paginator.has_previous()
        
        page_posts_query_set = paginator.object_list
        
        serializer = PostSerializer(page_posts_query_set, many=True)
        
        posts = serializer.data
        
        page = {"posts": posts, "page_has_next": page_has_next, "page_has_previous": page_has_previous}
        
        # This was a logic related to a removed feature in my app (a follow button in every post)
        # for post in posts:
        #     if Follower.objects.filter(followed_id=post["owner"]["id"], follower=self.request.user).exists():
        #         post["isFollowed"] = True
        #     else:
        #         post["isFollowed"] = False
                
        for post in posts:
            if Like.objects.filter(liked_by=self.request.user, liked_post_id=post["id"]).exists():
                post["isLiked"] = True
            else:
                post["isLiked"] = False
                
            likes_count = Like.objects.filter(liked_post_id=post["id"]).count()
            post["likes"] =  likes_count
            
        return page
    
    