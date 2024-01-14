
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("create-new-post", views.create_new_post, name="create_new_post"),
    path("get-posts", views.get_posts, name="get_posts"),
    path("post/<int:user_id>/<int:post_id>", views.post, name="post"),
    path("get-user-info", views.get_user_info, name="get_user_info"),
    
    
]
