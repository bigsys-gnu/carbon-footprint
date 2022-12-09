from django.db import models

# 회원가입한 사용자와 고용인들을 저장하는 테이블


class User_Employee(models.Model):
    UID = models.CharField(
        max_length=10, null=True, blank=True, unique=True
    )  # 회원가입한 ID, 회원가입을 하지 않고 상사가 입력한 경우 없을 수 있음
    PassWd = models.CharField(max_length=10, null=True, blank=True)  # ID와 동일
    Name = models.TextField()
    PhoneNum = models.TextField()
    Email = models.EmailField()
    Mother = models.TextField()
    Company = models.TextField()
    JobPos = models.TextField()  # 직위
    IdentityNum = models.TextField()  # 사번
    Authorization = models.IntegerField(null=True, blank=True)  # 접근 권한


# 회원사를 저장하는 테이블


class Company(models.Model):
    ComName = models.TextField()  # 사명
    Scope1 = models.IntegerField()
    Scope2 = models.IntegerField()
    Scope3 = models.IntegerField()
    chief = models.ForeignKey(  # 대표자
        "User_Employee", related_name="chiefCom", on_delete=models.CASCADE
    )
    admin = models.ForeignKey(  # 관리자
        "User_Employee",
        related_name="adminCom",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    Classification = models.TextField(null=True, blank=True)
    Description = models.TextField(null=True, blank=True)
    location = models.TextField(null=True, blank=True)


# 부서명을 저장하는 테이블


class Department(models.Model):
    DepartmentName = models.TextField()
    Scope1 = models.IntegerField()
    Scope2 = models.IntegerField()
    Scope3 = models.IntegerField()
    chief = models.ForeignKey(  # 대표자
        "User_Employee", related_name="chiefDepart", on_delete=models.CASCADE
    )
    admin = models.ForeignKey(  # 관리자
        "User_Employee",
        related_name="adminDepart",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    Classification = models.TextField(null=True, blank=True)
    Description = models.TextField(null=True, blank=True)
    location = models.TextField(null=True, blank=True)
    depth = models.IntegerField()  # 깊이
    upper = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True
    )  # 바로 위 노드
    Mother = models.ForeignKey("Company", on_delete=models.CASCADE)  # root 노드


# 탄소 사용량을 저장하는 테이블


class Carbon(models.Model):
    Content = models.TextField()  # 탄소가 발생된 활동의 이름
    Data = models.FloatField()  # 발생된 탄소량
    unit = models.TextField()  # 탄소량의 단위
    CarbonEmission = models.FloatField()  # kg 단위로 환산한 탄소량
    StartDate = models.DateField()  # 활동의 시작일
    EndDate = models.DateField()  # 활동의 종료일
    location = models.TextField()  # 활동의 위치
    Scope = models.IntegerField()  # 탄소 배출 단계
    chief = models.ForeignKey(
        "User_Employee", on_delete=models.SET_NULL, null=True
    )  # 관리자
    upper = models.ForeignKey("Department", on_delete=models.CASCADE)
    Mother = models.ForeignKey("Company", on_delete=models.CASCADE)  # root 노드
    Category = models.IntegerField()  # 탄소 배출 원인과 숫자를 매핑 ex) 고정연소, 이동연소
    Division = models.TextField(
        null=True
    )  # 구분 : 저장 형태 {건물명 : '', 설비명:'', 연료정보:'', 연료량:''}
