from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.validators import validate_email


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class LoginSerializer(serializers.Serializer):
    username_email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        is_email = False
        username_email = self.initial_data.get('username_email')
        password = self.initial_data.get('password')

        try:
            validate_email(username_email)
            is_email = True
        except:
            pass

        if is_email:
            # must check unique email on signup******
            the_user = User.objects.filter(email=username_email)
            if the_user.count() == 1:
                username = the_user.first().username
            else:
                raise serializers.ValidationError('Incorrect Credentials')
        else:
            username = username_email
        user = authenticate(username=username, password=password)
        if user and user.is_active:
            return user
        raise serializers.ValidationError('Incorrect Credentials')


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user
