from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def ensure_user_profile(sender, instance, raw=False, **kwargs):
    if raw:
        return

    # Keep profile existence idempotent for all user saves, including logins.
    Profile.objects.get_or_create(seller=instance)
