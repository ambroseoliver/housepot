from django.db.models.signals import post_delete
from django.db import transaction
from django.dispatch import receiver

from .models import PropertyImage


@receiver(post_delete, sender=PropertyImage)
def remove_property_image_file(sender, instance, **kwargs):
    if instance.image:
        transaction.on_commit(lambda: instance.image.delete(save=False))
