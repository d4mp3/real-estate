from django import forms
from django.contrib.gis.geos import Point

from .models import Listing


class ListingsForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = [
            'title',
            'description',
            'area',
            'borough',
            'listing_type',
            'property_status',
            'price',
            'rental_frequency',
            'rooms',
            'furnished',
            'pool',
            'elevator',
            'cctv',
            'parking',
            'date_posted',
            'location',
            'latitude',
            'longitude',
        ]

    latitude = forms.FloatField()
    longitude = forms.FloatField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        location = self.initial.get('location')

        if isinstance(location, Point):
            self.initial['latitude'] = location.tuple[0]
            self.initial['longitude'] = location.tuple[1]

    def clean(self):
        data = super().clean()
        latitude = data.pop('latitude')
        longitude = data.pop('longitude')
        data['location'] = Point(longitude, latitude, srid=4326)

        return data

