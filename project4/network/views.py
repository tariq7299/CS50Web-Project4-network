from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Like, Post, Follower
from .utils import PostHandler, InvalidMethodError, NoPostsYet, ErrorCreatingPost
from .serializers import PostSerializer, UserSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator


def index(request):
    return render(request, "network/index.html")


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        user_data = json.loads(request.body)
        
        print(user_data)

        # Attempt to sign user in
        username = user_data["username"]
        password = user_data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            print("request.user", request.user)
            user_data = UserSerializer(request.user).data
            # user_data = {"username": request.user.username, "email": request.user.email, "firstname": request.user.first_name, "lastname": request.user.last_name}
            print("user_data", user_data)
            return JsonResponse({"user_data": user_data})
        else:
            return JsonResponse({"message": "Invalid username and/or password"})
    else:
        return render(request, "network/login.html")


@csrf_exempt
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
def register(request):
    if request.method == "POST":
        user_data = json.loads(request.body)
        
        print("user_data", user_data)
        firstname = user_data["firstname"]
        lastname = user_data["lastname"]
        email = user_data["email"]
        username = user_data["username"]
        
        # Ensure password matches confirmation
        password = user_data["password"]
        confirmation = user_data["confirmation"]
        if password != confirmation:
            return JsonResponse({"message": "password must match"})

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password, first_name=firstname, last_name=lastname)
            user.save()
        except IntegrityError:
            return JsonResponse({"message": "Username already taken."})
        login(request, user)
        return JsonResponse({"user_data": user_data})
    else:
        return render(request, "network/register.html")


@csrf_exempt
def create_new_post(request):
    try: 
        post_handler = PostHandler(request)
        success_msg = post_handler.save_new_post()
        return JsonResponse(success_msg)
    except InvalidMethodError as error_msg:
        return JsonResponse({"error": str(error_msg)}, status=400)
    except ErrorCreatingPost as error_msg:
        return JsonResponse({"error": str(error_msg)}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts_for_you(request):
    page_number = request.GET.get('pageNumber')
    try:
        post_handler = PostHandler(request)
        page = post_handler.get_posts_for_you(page_number)
        
        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts_following(request):
    page_number = request.GET.get('pageNumber')
    try:
        post_handler = PostHandler(request)
        page = post_handler.get_posts_following(page_number)
        
        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts_for_user_profile(request, username):
    page_number = request.GET.get('pageNumber')
    try:
        post_handler = PostHandler(request)
        page = post_handler.get_posts_for_user_profile(username, page_number)
        
        # print("posts", posts)
        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)



# THis required in BASIC AUTHENTICATION
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def post(request, user_id, post_id):
    if request.method == "PUT":
        data = json.loads(request.body)
        
        
        # This was a removed feature in my app, that was a follow button in every post, then i removed this feature
        
        # if data.get("isFollowed") is not None:
        #     if data["isFollowed"]:
        #         if not Follower.objects.filter(followed_id=user_id, follower=request.user).exists():                
        #             follow = Follower(followed_id=user_id, follower=request.user)
        #             follow.save()
        #     else:
        #         if Follower.objects.filter(followed_id=user_id, follower=request.user).exists():               
        #             follow = Follower.objects.filter(followed_id=user_id, follower=request.user).first()
        #             follow.delete()

        #     return JsonResponse({"message": "Successfully updated follow status."})
        
        if data.get("postContent") is not None:
            try:
                post = Post.objects.filter(pk=post_id)
            except Post.DoesNotExist:
                return JsonResponse({"error": "Post doesn't exist."}, status=400)
            
            post = PostSerializer(post, many=True).data[0]
            
            post_owner = post["owner"]["username"]
                
            if request.user.username != post_owner:
                return JsonResponse({"error": "Can't edit this post, owner only can edit !."}, status=400)
            
            if data["postContent"]:
                    
                post.update(content=data["postContent"])
            else:
                    return JsonResponse({"error": "Please provide content."}, status=400)

            return JsonResponse({"message": "Successfully updated follow status."})
        
        if data.get("isLiked") is not None:
            if data["isLiked"]:
                if not Like.objects.filter(liked_by=request.user, liked_post_id=post_id).exists():                
                    like = Like(liked_by=request.user, liked_post_id=post_id)
                    like.save()
            else:
                if Like.objects.filter(liked_by=request.user, liked_post_id=post_id).exists():               
                    like = Like.objects.filter(liked_by=request.user, liked_post_id=post_id).first()
                    like.delete()

            return JsonResponse({"message": "Successfully updated like status."})
    return JsonResponse({"error": "Invalid request method."}, status=400)


# THis required in BASIC AUTHENTICATION
@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def follow(request, username):
    print("username", username)
    try:
        requested_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=400)
        
    if request.method == "PUT":
        data = json.loads(request.body)
        
        
        # This was a removed feature in my app, that was a follow button in every post, then i removed this feature
        
        if data.get("isFollowed") is not None:
            if data["isFollowed"]:
                if not Follower.objects.filter(followed=requested_user, follower=request.user).exists():                
                    follow = Follower(followed=requested_user, follower=request.user)
                    follow.save()
            else:
                if Follower.objects.filter(followed=requested_user, follower=request.user).exists():               
                    follow = Follower.objects.filter(followed=requested_user, follower=request.user).first()
                    follow.delete()

            return JsonResponse({"message": "Successfully updated follow status."})
    else:
        if Follower.objects.filter(followed=requested_user, follower=request.user).exists():
            follow_status = {"isFollowed" : True}
        else:
            follow_status = {"isFollowed" : False}
        
        return JsonResponse(follow_status)
       
    return JsonResponse({"error": "Invalid request method."}, status=400)

def pagination(request):
    posts = Post.objects.all()
    paginator = Paginator(posts, 25)
    # print("paginator", paginator.object_list)
    # print("paginator", paginator.object_list.values())
    return JsonResponse("YES", safe=False)
    
# @api_view(['GET'])
# @authentication_classes([BasicAuthentication])
# @permission_classes([IsAuthenticated])
# def get_user_info(request, format=None):
    
#     content = {
#         'user': str(request.user),  # `django.contrib.auth.User` instance.
#         'auth': str(request.auth),  # None
#     }
#     print("content", content)
#     return Response(content)
    