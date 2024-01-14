from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Like, Post, Follower
from .utils import PostHandler, InvalidMethodError, NoPostsYet, ErrorCreatingPost
from .serializers import PostSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated

def index(request):
    return render(request, "network/index.html")

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        
        print(data)

        # Attempt to sign user in
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            print("request.user", request.user)
            data = {"username": request.user.username, "email": request.user.email, "firstname": request.user.first_name, "lastname": request.user.last_name}
            print("data", data)
            return JsonResponse({"data": data})
        else:
            return JsonResponse({"message": "Invalid username and/or password"})
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data["username"]
        email = data["email"]

        # Ensure password matches confirmation
        password = data["password"]
        confirmation = data["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
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

def get_posts(request):
    
    try:
        post_handler = PostHandler(request)
        posts = post_handler.get_posts_for_you()
        
        return JsonResponse(posts, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)

@csrf_exempt
def post(request, user_id, post_id):
    current_user = get_object_or_404(User, pk=1)
    
    

    if request.method == "PUT":
        data = json.loads(request.body)
        
        if data.get("isFollowed") is not None:
            if data["isFollowed"]:
                if not Follower.objects.filter(followed_id=user_id, follower=current_user).exists():                
                    follow = Follower(followed_id=user_id, follower=current_user)
                    follow.save()
            else:
                if Follower.objects.filter(followed_id=user_id, follower=current_user).exists():               
                    follow = Follower.objects.filter(followed_id=user_id, follower=current_user).first()
                    follow.delete()

            return JsonResponse({"message": "Successfully updated follow status."})
        
        if data.get("isLiked") is not None:
            if data["isLiked"]:
                if not Like.objects.filter(liked_by=current_user, liked_post_id=post_id).exists():                
                    like = Like(liked_by=current_user, liked_post_id=post_id)
                    like.save()
            else:
                if Like.objects.filter(liked_by=current_user, liked_post_id=post_id).exists():               
                    like = Like.objects.filter(liked_by=current_user, liked_post_id=post_id).first()
                    like.delete()

            return JsonResponse({"message": "Successfully updated like status."})
    return JsonResponse({"error": "Invalid request method."}, status=400)

@api_view(['GET']) 
@permission_classes([IsAuthenticated]) 
def get_user_info(request): 
    
    if request.user is None:
        return JsonResponse({"error": "User is not authenticated, please log in !"}, status=400)
    # user_info = UserSerlizer(request.user)
    # print(user_info)

    user_name = request.user.username
    first_name = request.user.first_name  # Corrected here
    last_name = request.user.last_name  # Corrected here

    user_info = {"user_name": user_name, "first_name": first_name, "last_name": last_name}

    return JsonResponse(user_info)
    
    