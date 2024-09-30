from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import User, Like, Post, Follower
from .utils import PostHandler, InvalidMethodError, NoPostsYet, ErrorCreatingPost
from .serializers import PostSerializer

# from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required


# This will only work in DEBUG = False
# And will only work if also there is a "404.html" file in templates/ folder
def custom_404_view(request, exception):
    return render(request, "network/404.html", status=404)


def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "network/index.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@csrf_exempt
def login_view(request):
    if request.method == "POST":

        # user_data = json.loads(request.body)

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            # user_data = UserSerializer(request.user).data
            # user_data = {"username": request.user.username, "email": request.user.email, "firstname": request.user.first_name, "lastname": request.user.last_name}
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(
                request,
                "network/login.html",
                {"message": "Invalid email and/or password."},
            )
    else:
        return render(request, "network/login.html")


@csrf_exempt
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@csrf_exempt
def register(request):
    if request.method == "POST":
        # user_data = json.loads(request.body)

        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        username = request.POST["username"]
        email = request.POST["email"]

        # firstname = user_data["firstname"]
        # lastname = user_data["lastname"]
        # email = user_data["email"]
        # username = user_data["username"]

        # Ensure password matches confirmation
        # password = user_data["password"]
        # confirmation = user_data["confirmation"]

        confirmation = request.POST["confirmation"]
        password = request.POST["password"]

        if password != confirmation:
            return render(
                request, "network/register.html", {"message": "Passwords must match."}
            )

        # Attempt to create new user
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=firstname,
                last_name=lastname,
            )
            user.save()
        except IntegrityError:
            return render(
                request,
                "network/register.html",
                {"message": "Email address already taken."},
            )
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@login_required
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


@login_required
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_posts_for_you(request):
    page_number = request.GET.get("pageNumber")
    try:
        post_handler = PostHandler(request)
        page = post_handler.get_posts_for_you(page_number)

        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)


@login_required
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_posts_following(request):
    page_number = request.GET.get("pageNumber")
    try:
        post_handler = PostHandler(request)
        page = post_handler.get_posts_following(page_number)

        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)


@login_required
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
def get_posts_for_user_profile(request, username):
    page_number = request.GET.get("pageNumber")
    try:
        post_handler = PostHandler(request)

        page = post_handler.get_posts_for_user_profile(username, page_number)

        return JsonResponse(page, safe=False)
    except NoPostsYet as err_msg:
        return JsonResponse({"message": err_msg}, safe=False)


# THis required in BASIC AUTHENTICATION
@login_required
# @api_view(["PUT"])
# @permission_classes([IsAuthenticated])
@csrf_exempt
def post(request, user_id, post_id):
    if request.method == "PUT":
        data = json.loads(request.body)
        print("data", data)

        if data.get("postContent") is not None:
            try:
                post = Post.objects.filter(pk=post_id)
            except Post.DoesNotExist:
                return JsonResponse({"error": "Post doesn't exist."}, status=400)

            serlized_post = PostSerializer(post, many=True).data[0]

            post_owner = serlized_post["owner"]["username"]

            if request.user.username != post_owner:
                return JsonResponse(
                    {"error": "Can't edit this post, owner only can edit !."},
                    status=400,
                )

            if data["postContent"]:
                post.update(content=data["postContent"])
            else:
                return JsonResponse({"error": "Please provide content."}, status=400)

            return JsonResponse({"message": "Successfully updated follow status."})

        if data.get("isLiked") is not None:
            if data["isLiked"]:
                if not Like.objects.filter(
                    liked_by=request.user, liked_post_id=post_id
                ).exists():
                    like = Like(liked_by=request.user, liked_post_id=post_id)
                    like.save()
            else:
                if Like.objects.filter(
                    liked_by=request.user, liked_post_id=post_id
                ).exists():
                    like = Like.objects.filter(
                        liked_by=request.user, liked_post_id=post_id
                    ).first()
                    like.delete()

            return JsonResponse({"message": "Successfully updated like status."})
    return JsonResponse({"error": "Invalid request method."}, status=400)


# THis required in BASIC AUTHENTICATION
@login_required
# @api_view(["PUT", "GET"])
# @permission_classes([IsAuthenticated])
@csrf_exempt
def follow(request, username):

    try:
        requested_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=400)

    if request.method == "PUT":
        data = json.loads(request.body)
        # This was a removed feature in my app, that was a follow button in every post, then i removed this feature

        if data.get("isFollowed") is not None:
            if data["isFollowed"]:
                if not Follower.objects.filter(
                    followed=requested_user, follower=request.user
                ).exists():
                    follow = Follower(followed=requested_user, follower=request.user)
                    follow.save()
            else:
                if Follower.objects.filter(
                    followed=requested_user, follower=request.user
                ).exists():
                    follow = Follower.objects.filter(
                        followed=requested_user, follower=request.user
                    ).first()
                    follow.delete()

            return JsonResponse({"message": "Successfully updated follow status."})
    else:
        if Follower.objects.filter(
            followed=requested_user, follower=request.user
        ).exists():
            follow_status = {"isFollowed": True}
        else:
            follow_status = {"isFollowed": False}

        return JsonResponse(follow_status)

    return JsonResponse({"error": "Invalid request method."}, status=400)


# THis required in BASIC AUTHENTICATION
@login_required
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
@csrf_exempt
def get_user_status(request, username):

    try:
        requested_user = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=400)

    if request.method == "GET":

        # This was a removed feature in my app, that was a follow button in every post, then i removed this feature

        requested_user = User.objects.get(username=username)

        posts_count = Post.objects.filter(owner=requested_user).count()

        followers_count = Follower.objects.filter(followed=requested_user).count()

        following_count = Follower.objects.filter(follower=requested_user).count()

        user_status = {
            "posts_count": posts_count,
            "followers_count": followers_count,
            "following_count": following_count,
        }

        if Follower.objects.filter(
            followed=requested_user, follower=request.user
        ).exists():
            user_status["isFollowed"] = True
        else:
            user_status["isFollowed"] = False

        return JsonResponse(user_status)

    return JsonResponse({"error": "Invalid request method."}, status=400)


# THis required in BASIC AUTHENTICATION
@login_required
# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
@csrf_exempt
def get_current_user_info(request):

    print("request", request)

    try:
        User.objects.get(username=request.user.username)
    except User.DoesNotExist:
        return JsonResponse({"error": "Invalid user"}, status=400)

    requested_user = User.objects.get(username=request.user.username)

    print("requested_userFIRST", requested_user.first_name)
    print("requested_userLAST", requested_user.last_name)

    current_user_info = {
        "firstName": requested_user.first_name,
        "lastName": requested_user.last_name,
        "userID": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
    }

    return JsonResponse({"userData": current_user_info})
