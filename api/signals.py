from django.db.models.signals import pre_save
from django.contrib.auth.models import User


# overwrites the user model so the the username = email
def updateUser(sender, instance, **kwargs):
   print('>>> Signal Triggered <<<')

   user = instance
   if user.email != '':
      user.username = user.email


# Triggers updateUser before saving
pre_save.connect(updateUser, sender=User)   