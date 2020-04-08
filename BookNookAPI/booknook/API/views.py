from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.models import User
from django.core.validators import validate_email
from API.models import Profile, Book
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import LimitOffsetPagination
from django.db.models import Q
from .Serializers.serializer import (
    LoginSerializer,
    SignupSerializer,
    ProfileSerializer,
    UserSerializer,
    ProfileUpdateSerializer,
    BookSerializer
)


class Login(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        try:
            profile = Profile.objects.get(user=user)
            profile_data = ProfileSerializer(profile).data
        except:
            profile_data = "No Profile Data"

        return Response({
            'profile': profile_data,
            'user': UserSerializer(user).data,
            'token': token.key,
        })


class Signup(APIView):
    permission_classes = [AllowAny]
    serializer_class = SignupSerializer

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'user': UserSerializer(user).data,
            "token": token.key
        }, status=status.HTTP_201_CREATED)


class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        username = kwargs.get('username')
        try:
            user = User.objects.get(username=username)
            profile = Profile.objects.get(user=user)

        except:
            return Response("No user found named "+username, status=status.HTTP_404_NOT_FOUND)
        return Response({

            'user': UserSerializer(user).data,
            'profile': ProfileSerializer(profile).data
        })


class ProfileUpdate(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ProfileUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.data.get('name')
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        mobile = serializer.data.get('mobile')
        city = serializer.data.get('city')

        try:
            validate_email(email)
        except:
            return Response("Enter Valid Email")

        the_user = User.objects.filter(email=email)
        if the_user.count() >= 1:
            return Response("Email Already Used")

        if len(password) <= 7:
            return Response("Password length must be 8!")

        try:
            profile = Profile.objects.get(user=request.user)
            profile.name = name
            profile.mobile = mobile
            profile.city = city
        except:
            profile = Profile(user=request.user, name=name,
                              mobile=mobile, city=city)
        profile.save()

        user = User.objects.get(username=request.user.username)
        if password != "None":
            user.set_password(password)
        if email != "None@None.com":
            user.email = email

        user.save()

        return Response(ProfileSerializer(profile).data)


class DeleteId(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user = User.objects.get(username=request.user.username)
            user.delete()
            return Response(status.HTTP_200_OK)
        except:
            return Response(status.HTTP_400_BAD_REQUEST)


class CreateBook(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seriazer = BookSerializer(data=request.data)
        seriazer.is_valid(raise_exception=True)

        name = seriazer.data.get('name')
        author = seriazer.data.get('author')
        price = seriazer.data.get('price')

        book = Book(
            user=request.user,
            name=name,
            author=author,
            price=price
        )

        book.save()
        return Response(BookSerializer(book).data)


class BookList(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = LimitOffsetPagination


class BookDetaileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        pk = kwargs.get("pk")
        try:
            book = Book.objects.get(id=pk)
        except:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookSerializer(book)
        user = User.objects.get(id=book.user.id)
        profile = Profile.objects.get(user=user)
        return Response({
            'book': serializer.data,
            'user': UserSerializer(user).data,
            'profile': ProfileSerializer(profile).data
        })


class DeleteBook(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            pk = kwargs.get("pk")
            book = Book.objects.get(id=pk)
            if request.user == book.user:
                book.delete()
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class Search(ListAPIView):
    permission_classes = [AllowAny]
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = LimitOffsetPagination

    def get_queryset(self, *args, **kwargs):
        q = self.request.GET.get('q')
        if q:
            queryset = Book.objects.filter(
                Q(name__icontains=q) |
                Q(author__icontains=q)).distinct().order_by('-timestamp')
        else:
            queryset = Book.objects.all()

        return queryset
