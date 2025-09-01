from listings.models import Listing
from rest_framework import generics

from .serializers import ListingSerializer


class ListingList(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-date_posted')
    serializer_class = ListingSerializer


class ListingCreate(generics.CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer