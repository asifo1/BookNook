from django.urls import path, include
from .views import (
    Login,
    Signup,
    ProfileView,
    ProfileUpdate,
    DeleteId,
    BookList,
    BookDetaileView,
    DeleteBook,
    CreateBook,
    Search,
    UserValidation,
    MyBookList
)

urlpatterns = [
    path('login/', Login.as_view()),
    path('signup/', Signup.as_view()),
    path('profile/', ProfileUpdate.as_view()),
    path('profile/<str:username>', ProfileView.as_view()),
    path('delete/', DeleteId.as_view()),
    path('books/', BookList.as_view()),
    path('book/<int:pk>', BookDetaileView.as_view()),
    path('remove/<int:pk>', DeleteBook.as_view()),
    path('create/', CreateBook.as_view()),
    path('search/', Search.as_view()),
    path('isuser/', UserValidation.as_view()),
    path('mybooks/', MyBookList.as_view())

]
