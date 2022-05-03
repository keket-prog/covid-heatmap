from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)


urlpatterns =[

   path('', views.getRoutes),
   #path('notes/', views.getNotes),
   path('profile/', views.getUserProfile, name="users-profile"),
   path('users/', views.getUsers, name="users"),
   path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('users/register/', views.registerUser, name='register'),
   path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   #covid data views
   path('covid/all/', views.homePage, name="covid-all")
]