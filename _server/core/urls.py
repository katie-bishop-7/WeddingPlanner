from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('task_list/', view=views.create_task, name="task_list"),
    path('task_list/<int:task_id>/', view=views.set_task, name="task_list"),
    path('guest_list/', view=views.guest, name="guest_list"),
    path('guest_list/<int:guest_id>/', view=views.guest, name="guest_list"),
]