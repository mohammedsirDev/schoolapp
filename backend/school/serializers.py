from rest_framework import serializers
from school.models import Teacher, Program, Event, Student, Grade, Review, Testimonial, FeedbackUser, Subject
from userauths.models import Profile, User
from rest_framework.authtoken.models import Token # Fixed import from views to models

# ---------------------------------------------------------
# AUTHENTICATION & PROFILE SERIALIZERS
# ---------------------------------------------------------

class UserSerializer(serializers.ModelSerializer):
    """Handles user registration and basic account details."""
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {"password": {"write_only": True, "required": True}}

    def create(self, validated_data):
        """Creates a user and automatically generates an Auth Token."""
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    """Maps the user profile and their specific roles (Student/Teacher/etc)."""
    class Meta:
        model = Profile
        fields = ['id', 'user', 'role']

# ---------------------------------------------------------
# SCHOOL STAFF & SUBJECT SERIALIZERS
# ---------------------------------------------------------

class TeacherSerializer(serializers.ModelSerializer):
    """Returns full instructor details including bio and image."""
    class Meta:
        model = Teacher
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    """Returns the name of the academic subject."""
    class Meta:
        model = Subject
        fields = "__all__"

# ---------------------------------------------------------
# ACADEMIC & STUDENT SERIALIZERS
# ---------------------------------------------------------

class GradeSerialize(serializers.ModelSerializer):
    """Serializes student marks with full subject details."""
    subject = SubjectSerializer(read_only=True)
    # Allows sending 'subject_id' as an integer during POST/PUT
    subject_id = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(), 
        source="subject", 
        write_only=True
    )
    
    class Meta:
        model = Grade
        fields = "__all__"

class StudentSerialize(serializers.ModelSerializer):
    """Shows student info along with a nested list of their grades."""
    grades = GradeSerialize(many=True, read_only=True)
    
    class Meta:
        model = Student
        fields = ('id', 'user', 'grade_level', 'grades')

# ---------------------------------------------------------
# ENGAGEMENT & FEEDBACK SERIALIZERS
# ---------------------------------------------------------

class FeedbackUserSerializer(serializers.ModelSerializer):
    """Serializes the external user providing feedback."""
    class Meta:
        model = FeedbackUser
        fields = ["id", "name", "email"]

class ReviewSerialize(serializers.ModelSerializer):
    """Serializes course reviews with nested user identification."""
    user = FeedbackUserSerializer(read_only=True)
    
    class Meta:
        model = Review
        fields = "__all__"

class ProgramSerialize(serializers.ModelSerializer):
    """Main serializer for Courses, including teacher details and student reviews."""
    teacher = TeacherSerializer(read_only=True)
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=Teacher.objects.all(), 
        source="teacher", 
        write_only=True
    )
    reviews = ReviewSerialize(many=True, read_only=True)
    
    class Meta:
        model = Program
        fields = "__all__"

class TestimonialSerialize(serializers.ModelSerializer):
    """Serializes general platform testimonials."""
    user = FeedbackUserSerializer(read_only=True)
    
    class Meta:
        model = Testimonial
        fields = "__all__"
        read_only_fields = ['user']

# ---------------------------------------------------------
# CAMPUS EVENTS SERIALIZER
# ---------------------------------------------------------

class EventSerialize(serializers.ModelSerializer):
    """Serializes upcoming school events and workshops."""
    class Meta:
        model = Event
        fields = "__all__"