from listings.models import Listing
from rest_framework import generics

from .serializers import ListingSerializer


class ListingList(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
