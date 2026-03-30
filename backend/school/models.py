from django.db import models
from userauths.models import Profile, User

# ---------------------------------------------------------
# STAFF & TEACHING MODELS
# ---------------------------------------------------------

class Teacher(models.Model):
    """Stores information about instructors/professors."""
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    image = models.FileField(upload_to="teachers/")
    description = models.TextField(null=True, blank=True) # Changed from 'Description' to lowercase

    def __str__(self):
        return self.name
    
# ---------------------------------------------------------
# EDUCATIONAL CONTENT MODELS
# ---------------------------------------------------------

class Program(models.Model):
    """Defines courses or educational programs offered."""
    title = models.CharField(max_length=300)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2) # e.g., 9999.99 DH
    image = models.FileField(upload_to="programs/")
    seats = models.PositiveIntegerField(default=30)
    lessons = models.PositiveIntegerField(default=40)
    hours = models.PositiveBigIntegerField(default=60) 
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

class Subject(models.Model):
    """Categorization for specific academic fields (Math, CS, etc.)."""
    name = models.CharField(max_length=120)

    def __str__(self):
        return self.name   

# ---------------------------------------------------------
# USER & STUDENT DATA
# ---------------------------------------------------------

class Student(models.Model):
    """Extended user profile specifically for student-related data."""
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, null=True, blank=True)
    subject = models.CharField(max_length=100, null=True, blank=True)
    image = models.FileField(upload_to='student/', null=True, blank=True)
    grade_level = models.CharField(max_length=150) # e.g., "Bac+3" or "Licence"

    def __str__(self):
        return self.user.username

class Grade(models.Model):
    """Tracks academic performance per student and subject."""
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="grades")
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="grades", null=True, blank=True)
    mark = models.DecimalField(max_digits=5, decimal_places=2) # e.g., 20.00

    def __str__(self):
        return f"{self.student.user.username} - {self.mark}"

# ---------------------------------------------------------
# ENGAGEMENT & FEEDBACK MODELS
# ---------------------------------------------------------

class FeedbackUser(models.Model):
    """External users or students who provide reviews and testimonials."""
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    """Individual course/program evaluations."""
    user = models.ForeignKey(FeedbackUser, on_delete=models.CASCADE)
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) # Fixed 'reated_at' typo

    def __str__(self):
        return f"{self.user.name} - {self.program.title}"   

class Testimonial(models.Model):
    """General feedback displayed on the landing page."""
    user = models.ForeignKey(FeedbackUser, on_delete=models.SET_NULL, null=True)
    comment = models.TextField()
    rating = models.PositiveIntegerField(default=5) # 1 to 5 stars
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.name} ({self.rating} stars)"

# ---------------------------------------------------------
# CAMPUS EVENTS
# ---------------------------------------------------------

class Event(models.Model):
    """Campus activities, workshops, or seminars."""
    title = models.CharField(max_length=300)
    description = models.TextField()
    date = models.DateField()
    time_from = models.TimeField()
    time_to = models.TimeField()
    location = models.CharField(max_length=200)
    image = models.FileField(upload_to="events/")

    def __str__(self):
        return self.title