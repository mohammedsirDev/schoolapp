from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save

# ---------------------------------------------------------
# CUSTOM USER MODEL
# ---------------------------------------------------------

class User(AbstractUser):
    """
    Custom User model where email is the unique identifier 
    for authentication instead of usernames.
    """
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=100, null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    
    # Security & Verification fields
    otp = models.CharField(max_length=100, null=True, blank=True)
    reset_token = models.CharField(max_length=1000, null=True, blank=True)
    
    # Configure authentication to use email
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email
    
    def save(self, *args, **kwargs):
        """
        Auto-fills full_name and username from the email prefix 
        if they are not provided during registration.
        """
        if self.email:
            # Extract the part before '@'
            email_username = self.email.split("@")[0]
            
            if not self.full_name:
                self.full_name = email_username
            if not self.username:
                self.username = email_username
        
        super(User, self).save(*args, **kwargs)

# ---------------------------------------------------------
# USER PROFILE & ROLES
# ---------------------------------------------------------

class Profile(models.Model):
    """
    Extends the User model with specific application roles.
    Uses a OneToOne link to ensure every user has exactly one profile.
    """
    ROLE_CHOICES = (
        ('visitor', 'Visitor'),
        ('student', 'Student'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=120, choices=ROLE_CHOICES, default='visitor')

    def __str__(self):
        return f"{self.user.username} - {self.role}"

# ---------------------------------------------------------
# SIGNALS (Optional but Recommended)
# ---------------------------------------------------------

def create_user_profile(sender, instance, created, **kwargs):
    """Automatically creates a Profile object whenever a new User is registered."""
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    """Ensures the Profile is saved whenever the User object is updated."""
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)