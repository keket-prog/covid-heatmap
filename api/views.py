from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import UserSerializer,UserSerializerWithToken

from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status

import requests
# Create your views here.

# addes the user name to the token
# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#    @classmethod
#    def get_token(cls, user):
#       token = super().get_token(user)

#         # Add custom claims
#       token['name'] = user.username
#         # ...

#       return token

# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
            # print(data)
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
def getRoutes(request):

   routes = [
      '/api/token',
      '/api/token/refresh'
   ]
   return Response(routes)

# Shows the duthenticated users profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
   user = request.user
   serializer = UserSerializer(user,many=False)

   return Response(serializer.data)

#Register a new user
@api_view(['POST'])
def registerUser(request):
   data = request.data
   try:
      #print('DATA', data)
      user = User.objects.create_user(
         first_name=data['name'],
         username=data['email'],
         email=data['email'],
         password=make_password(data['password'])
      )

      serializer = UserSerializerWithToken(user, many=False)

      return Response(serializer.data)
   except:
       message = {'detail': 'User with this email already exists'}
       return Response(message, status=status.HTTP_400_BAD_REQUEST)

# Get all users - restricted to admin users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
   users = User.objects.all()
   serializer = UserSerializer(users, many=True)
   return Response(serializer.data)

@api_view(['GET'])
def homePage(request):
   res = requests.get('https://disease.sh/v3/covid-19/countries')
   all_data = res.json()
   return Response(all_data)

@api_view(['GET'])
def globalData(request):
   res = requests.get('https://disease.sh/v3/covid-19/all')
   all_data = res.json()
   return Response(all_data)