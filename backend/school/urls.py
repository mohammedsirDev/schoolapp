from django.urls import path,include
from school.views import TeacherViewSet,ProgramViewSet,EventViewSet,GradeViewSet,StudentViewSet,ReviewViewSet,TestimonialViewSet,FeedbackUserViewSet,UserViewSet,ProfileViewSet,SubjectViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register("Teacher",TeacherViewSet)
router.register("Program",ProgramViewSet)
router.register("Event",EventViewSet)
router.register("Grade",GradeViewSet)
router.register("Student",StudentViewSet)
router.register("Review",ReviewViewSet)
router.register("Testimonial",TestimonialViewSet)
router.register("FeedbackUser",FeedbackUserViewSet)
router.register("users",UserViewSet)
router.register("profile",ProfileViewSet)
router.register("subjects",SubjectViewSet)


urlpatterns = [
    path('',include(router.urls)),
]



