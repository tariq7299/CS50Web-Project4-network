from rest_framework import serializers
from .models import User, Post, Like, Follower


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    username = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    
class PostSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    date_released = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S', read_only=True)
    owner = UserSerializer(read_only=True)
    content = serializers.CharField()
    
    def create(self, validated_data):
        return Post.objects.create(**validated_data)