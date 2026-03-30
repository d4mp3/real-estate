from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils import timezone

from users.models import Profile


class UserProfileSignalsTests(TestCase):
    def test_user_save_recreates_missing_profile(self):
        user = get_user_model().objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='testpass123',
        )
        user.profile.delete()

        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])

        self.assertTrue(Profile.objects.filter(seller=user).exists())

    def test_login_recreates_missing_profile(self):
        user = get_user_model().objects.create_superuser(
            username='admin2',
            email='admin2@example.com',
            password='testpass123',
        )
        user.profile.delete()

        logged_in = self.client.login(username='admin2', password='testpass123')

        self.assertTrue(logged_in)
        self.assertTrue(Profile.objects.filter(seller=user).exists())
