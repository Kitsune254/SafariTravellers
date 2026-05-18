
from django.contrib import admin
from django.urls import path
from core import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('feedback/', views.feedback, name='feedback'),
    path('account/', views.account, name='account'),
    path('login/', views.login_page, name='login'),
    path('signup/', views.signup_page, name='signup'),
]
