import django_filters

from .models import Property


class PropertyFilter(django_filters.FilterSet):
    location = django_filters.CharFilter(field_name="location", lookup_expr="icontains")
    min_price = django_filters.NumberFilter(field_name="price", lookup_expr="gte")
    max_price = django_filters.NumberFilter(field_name="price", lookup_expr="lte")
    bedrooms = django_filters.NumberFilter(field_name="bedrooms", lookup_expr="gte")
    bathrooms = django_filters.NumberFilter(field_name="bathrooms", lookup_expr="gte")
    amenity = django_filters.CharFilter(field_name="amenities__slug", lookup_expr="iexact")

    class Meta:
        model = Property
        fields = ["location", "city", "property_type", "listing_type", "min_price", "max_price", "bedrooms", "bathrooms", "amenity"]
