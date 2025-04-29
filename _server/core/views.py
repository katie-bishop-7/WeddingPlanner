from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.forms.models import model_to_dict
from django.http import JsonResponse
from .models import Wedding, Task, Guest, User

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
@login_required
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

@login_required
def create_task(req):
    if req.method == "POST":
        body = json.loads(req.body)
        task = Task(
            wedding=req.user.wedding,
            name=body["name"],
            description=body["description"],
            due_date=body["due_date"],
            completed=body["completed"]
        )

        task.save()
        return JsonResponse(
            {"task" : model_to_dict(task)}
        )
    tasks = [model_to_dict(task) for task in req.user.wedding.tasks.all()]
    return JsonResponse(
        {"tasks" : tasks}
    )

@login_required
def set_task(req, task_id):
    if req.method == "POST":
        body = json.loads(req.body)
        task = Task.objects.get(id=task_id)
        task.name = body["name"]
        task.description = body["description"]
        task.due_date = body["due_date"]
        task.completed = body["completed"]
        task.save()
        return JsonResponse(
            {"task" : model_to_dict(task)}
        )
    else:
        task = Task.objects.get(id=task_id)
        return JsonResponse(
            {"task" : model_to_dict(task)}
        )
    
@login_required
def guest(req):
    if req.method == "POST":
        body = json.loads(req.body)
        guest = Guest(
            wedding=req.user.wedding,
            first_name=body["first_name"],
            last_name=body["last_name"],
            role=body["role"],
            email=body["email"],
            phone_number=body["phone_number"],
            rsvp_status=body["rsvp_status"]
        )
        guest.save()
        return JsonResponse(
            {"guest" : model_to_dict(guest)}
        )
    guests = [model_to_dict(guest) for guest in req.user.wedding.guests.all()]
    return JsonResponse(
        {"guests" : guests}
    )