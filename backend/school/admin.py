from django.contrib import admin

from school.models import Teacher,Program,Event,Student,Grade,Review,Testimonial,FeedbackUser,Subject
admin.site.register(FeedbackUser)
admin.site.register(Teacher)
admin.site.register(Program)
admin.site.register(Event)
admin.site.register(Student)
admin.site.register(Grade)
admin.site.register(Review)
admin.site.register(Testimonial)
admin.site.register(Subject)
