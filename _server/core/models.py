from django.db import models

# User for authentication and login

class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    
# Wedding model one-to-one relationship with User model

class Wedding(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='wedding')
    date = models.DateField()
    location = models.CharField(max_length=255)
    theme = models.CharField(max_length=100, blank=True, null=True)
    guest_count = models.PositiveIntegerField(default=0)
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

# Guest model many-to-one relationship with Wedding model
    
class Guest(models.Model):
    wedding = models.ForeignKey(Wedding, on_delete=models.CASCADE, related_name='guests')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default='Guest')
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    rsvp_status = models.CharField(max_length=50, choices=[('Accepted', 'Accepted'), ('Declined', 'Declined'), ('Pending', 'Pending')], default='Accepted')

    def __str__(self):
        return f"{self.name} - {self.rsvp_status}"
    
# BudgetItem model many-to-one relationship with Wedding model
    
class BudgetItem(models.Model):
    wedding = models.ForeignKey(Wedding, on_delete=models.CASCADE, related_name='budget_items')
    name = models.CharField(max_length=100)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, choices=[('Venue', 'Venue'), ('Catering', 'Catering'), ('Photography', 'Photography'), ('Entertainment', 'Entertainment'), ('Attire', 'Attire'), ('Flowers', 'Flowers'), ('Decorations', 'Decorations')])
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    due_date = models.DateField()
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.cost}"

# Task model many-to-one relationship with Wedding model
    
class Task(models.Model):
    wedding = models.ForeignKey(Wedding, on_delete=models.CASCADE, related_name='tasks')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    due_date = models.DateField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {'Completed' if self.completed else 'Pending'}"