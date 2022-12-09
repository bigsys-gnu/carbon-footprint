from rest_framework import serializers
from .models import *

# User, Employee 직렬화(객체를 json으로 변환)


class User_EmployeeSerializer(serializers.ModelSerializer):  # 모델 전체를 직렬화(json 변환)
    class Meta:
        model = User_Employee
        fields = "__all__"


# Company 직렬화(객체를 json으로 변환)


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = "__all__"


# Department 직렬화(객체를 json으로 변환)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"


# Carbon 직렬화(객체를 json으로 변환)


class CarbonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carbon
        fields = "__all__"
