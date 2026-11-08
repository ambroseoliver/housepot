from io import BytesIO
from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.exceptions import ValidationError
from PIL import Image, ImageOps, UnidentifiedImageError


def validate_property_image(upload):
    if upload.size > settings.MAX_UPLOAD_SIZE:
        raise ValidationError("Images must be 8 MB or smaller.")
    if upload.content_type not in settings.ALLOWED_IMAGE_TYPES:
        raise ValidationError("Upload a JPG, PNG, or WebP image.")

    try:
        image = Image.open(upload)
        if image.format not in {"JPEG", "PNG", "WEBP"}:
            raise ValidationError("Upload a JPG, PNG, or WebP image.")
        if image.width > 8000 or image.height > 8000:
            raise ValidationError("Image dimensions must not exceed 8000 by 8000 pixels.")
        image.verify()
    except (UnidentifiedImageError, OSError) as exc:
        raise ValidationError("The uploaded file is not a valid image.") from exc
    finally:
        upload.seek(0)


def optimize_property_image(upload):
    with Image.open(upload) as source:
        image_format = source.format
        image = ImageOps.exif_transpose(source)
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        output = BytesIO()
        if image_format == "JPEG":
            image = image.convert("RGB")
            image.save(output, format="JPEG", optimize=True, progressive=True, quality=85)
            extension = ".jpg"
        elif image_format == "PNG":
            image.save(output, format="PNG", optimize=True)
            extension = ".png"
        else:
            image.save(output, format="WEBP", method=6, quality=85)
            extension = ".webp"
    return ContentFile(output.getvalue(), name=f"{Path(upload.name).stem}{extension}")
