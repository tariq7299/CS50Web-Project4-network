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

def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
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
            
    