
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create-new-post", views.create_new_post, name="create_new_post"),
    path("get-posts-for-you", views.get_posts_for_you, name="get_posts_for_you"),
    path("get-posts-following", views.get_posts_following, name="get_posts_following"),
    path("get-posts-for-user-profile/<str:username>", views.get_posts_for_user_profile, name="get_posts_for_user_profile"),
    path("post/<int:user_id>/<int:post_id>", views.post, name="post"),
    path("get-user-info", views.get_user_info, name="get_user_info"),
    
    
]
