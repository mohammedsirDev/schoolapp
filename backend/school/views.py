from django.http import HttpResponse
from rest_framework.pagination import PageNumberPagination
from rest_framework import viewsets, permissions

# Models & Serializers
from school.serializers import (
    TeacherSerializer, ProgramSerialize, EventSerialize, SubjectSerializer,
    GradeSerialize, StudentSerialize, ReviewSerialize, TestimonialSerialize, 
    FeedbackUserSerializer, ProfileSerializer, UserSerializer
)
from school.models import Teacher, Program, Event, Student, Grade, Review, Testimonial, FeedbackUser, Subject
from userauths.models import Profile, User

# ---------------------------------------------------------
# AUTH & USER MANAGEMENT
# ---------------------------------------------------------

class UserViewSet(viewsets.ModelViewSet):
    """API endpoint for managing system users."""
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint for User Profiles.
    Restricted: Users can only see their own profile information.
    """
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

# ---------------------------------------------------------
# ACADEMIC ADMINISTRATION
# ---------------------------------------------------------

class TeacherViewSet(viewsets.ModelViewSet):
    """API endpoint for listing and managing teachers."""
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    """API endpoint for academic subjects. Requires authentication."""
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAuthenticated]

class StudentViewSet(viewsets.ModelViewSet):
    """API endpoint for managing student records."""
    queryset = Student.objects.all()
    serializer_class = StudentSerialize
    permission_classes = [permissions.IsAuthenticated]

class GradeViewSet(viewsets.ModelViewSet):
    """
    API endpoint for Student Grades.
    Logic: Filters results to return only grades belonging to the logged-in student.
    """
    queryset = Grade.objects.all()
    serializer_class = GradeSerialize
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Grade.objects.filter(student__user=self.request.user)

# ---------------------------------------------------------
# CONTENT & PROGRAMS
# ---------------------------------------------------------

class ProgramPagination(PageNumberPagination):
    """Custom pagination to show 6 programs per page for the frontend grid."""
    page_size = 6

class ProgramViewSet(viewsets.ModelViewSet):
    """API endpoint for educational programs with built-in pagination."""
    queryset = Program.objects.all()
    serializer_class = ProgramSerialize
    pagination_class = ProgramPagination

class EventViewSet(viewsets.ModelViewSet):
    """API endpoint for school events and workshops."""
    queryset = Event.objects.all()
    serializer_class = EventSerialize

# ---------------------------------------------------------
# FEEDBACK & INTERACTION
# ---------------------------------------------------------

class FeedbackUserViewSet(viewsets.ModelViewSet):
    """API endpoint for users who provide feedback (External/internal)."""
    queryset = FeedbackUser.objects.all()
    serializer_class = FeedbackUserSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    """
    Handles program reviews.
    Logic: Automatically links the review to a FeedbackUser based on email/name.
    """
    queryset = Review.objects.all()
    serializer_class = ReviewSerialize
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        email = self.request.data.get("email")
        name = self.request.data.get("name")

        feedback_user, created = FeedbackUser.objects.get_or_create(
            email=email,
            defaults={"name": name}
        )

        if not created and not feedback_user.name:
            feedback_user.name = name
            feedback_user.save()

        serializer.save(user=feedback_user)

class TestimonialViewSet(viewsets.ModelViewSet):
    """
    Handles site-wide testimonials.
    Ordered by newest first.
    """
    queryset = Testimonial.objects.all().order_by("-created_at")
    serializer_class = TestimonialSerialize
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        email = self.request.data.get("email")
        name = self.request.data.get("name")

        feedback_user, created = FeedbackUser.objects.get_or_create(
            email=email,
            defaults={"name": name}
        )

        if not created and not feedback_user.name:
            feedback_user.name = name
            feedback_user.save()

        serializer.save(user=feedback_user)