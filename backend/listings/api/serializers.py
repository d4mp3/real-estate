from listings.models import Listing
from rest_framework import serializers


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    seller_username = serializers.SerializerMethodField()

    def get_seller_username(self, obj):
        return obj.seller.username

    def get_country(self, obj):
        return "Poland"

    class Meta:
        model = Listing
        fields = '__all__'
