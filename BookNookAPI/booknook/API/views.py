from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .Serializers.serializer import LoginSerializer, SignupSerializer, ProfileSerializer
from rest_framework.authtoken.models import Token
from rest_framework.renderers import JSONRenderer
from .models import Profile


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
            profile_data = ProfileSerializer(profile).data,
        except:
            profile_data = "No Profile Data"

        return Response({
            'user': profile_data,
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
            "token": token.key
        })
