from rest_framework import serializers
from .models import Company
from authentication.models import User
from authentication.serializers import RegisterSerializer,UsersbyCompanySerializer

class companySerializerGet(serializers.ModelSerializer):
    manager = RegisterSerializer(required=True)

    class Meta:
        model=Company
        fields = ('id','name','image','manager','status','users','country','language','address')
        depth=1
        

class companySerializerPost(serializers.ModelSerializer):

    class Meta:
        model=Company
        fields = ('id','name','image','manager','users','country','language','address','status')
        


class companySerializerGetusers(serializers.ModelSerializer):
    users=UsersbyCompanySerializer(many=True)

    
    class Meta:
        model=Company
        fields = ['users']
        




    #    def create (self, validated_data):

     #     validated_manager = validated_data.pop('manager')

      #    if User.objects.filter(username=validated_manager["username"]).exists():
       #     raise serializers.ValidationError({"username": "This username is already in use."})
        
        #  if User.objects.filter(email=validated_manager["email"]).exists():
         #   raise serializers.ValidationError({"email": "This email is already in use."})
          
         

         # manager = RegisterSerializer.create(RegisterSerializer(),validated_data=validated_manager)

         # company = Company.objects.create(manager=manager,
          #                  code=validated_data.pop('code'),name=validated_data.pop('name'))

        #  username=validated_manager.pop('username','')
        #  email = validated_manager.pop('email', '')
        #  password = validated_manager.pop('password', '12345678test')
       #   manager = User.objects.create(username=username, email=email, password=password)
          

       #   print("xxxxxxx",validated_data)
          
         
        
         # return company



  #  def update(self, instance, validated_data):

        
        
#validated_manager = validated_data.pop('manager', {})

 #       instance2 = instance.user

  #      instance2.username = validated_manager.get('username', instance2.username)
   #     instance.code=validated_data.get('code',instance.skills)
    #    instance.name=validated_data.get('name',instance.phonenumber)
        

     #   instance2.save()
      #  instance.save()
        
       
       

       # return instance


    
         
        
       


