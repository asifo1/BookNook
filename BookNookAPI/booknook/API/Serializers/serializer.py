from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from API.models import Profile, Book


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('name', 'city', 'mobile')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')


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

    def validate(self, data):
        email = self.initial_data.get('email')
        password = self.initial_data.get('password')
        the_user = User.objects.filter(email=email)

        if len(password) <= 7:
            raise serializers.ValidationError('Password length must be 8!')

        if the_user.count() == 0:
            return data
        else:
            raise serializers.ValidationError('Email Already Used!')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        return user


class ProfileUpdateSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()
    mobile = serializers.CharField()
    city = serializers.CharField()


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('__all__')
        extra_kwargs = {'password': {'read_only': True}}

    def validate(self, data):
        name = self.initial_data.get('name')
        author = self.initial_data.get('author')
        price = self.initial_data.get('price')

        if name != "" and author != "" and price != "":
            return data
        else:
            raise serializers.ValidationError('Incorrect Credentials')
