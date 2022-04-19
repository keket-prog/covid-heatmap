from rest_framework.serializers import ModelSerializer, SerializerMethodField
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Subscription

class UserSerializer(ModelSerializer):
   name = SerializerMethodField(read_only=True)
   _id = SerializerMethodField(read_only=True)
   isAdmin = SerializerMethodField(read_only=True)
   class Meta:
      model = User
      fields=['id', '_id', 'username', 'email', 'name','isAdmin']

   def get__id(self, obj):
        return obj.id

   def get_isAdmin(self, obj):
        return obj.is_staff

#create custom name field to send data to the forntend using
# first_name and last_name fields
   def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        token['name'] = obj.username
        return {
            'refresh': str(token),
            'access': str(token.access_token),
            
            }

#subscription 
# 
class SubscriptionSerializer(ModelSerializer):
    class Meta:
        model = Subscription
        fields='__all__'           