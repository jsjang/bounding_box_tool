from django.db import models

class Annotations(models.Model):
    id = models.AutoField(primary_key=True)
    image_id = models.IntegerField(null=False)
    seq_num = models.IntegerField(null=False) 
    image_url = models.CharField(max_length=500, null=False)
    type = models.CharField(max_length=30, null=True)
    category_id = models.IntegerField(blank=True, null=True)
    lefttop_x = models.IntegerField(blank=True, null=True)
    lefttop_y = models.IntegerField(blank=True, null=True)
    rightbottom_x = models.IntegerField(blank=True, null=True)       
    rightbottom_y = models.IntegerField(blank=True, null=True) 
    truncated = models.IntegerField(blank=True, null=True)    
    hidden = models.IntegerField(blank=True, null=True)   
    light_reflex = models.IntegerField(blank=True, null=True)
    na = models.IntegerField(blank=True, null=True)       
    flag = models.IntegerField(blank=True, null=True)
    cat_class_id = models.IntegerField(blank=True, null=False)
    info_id = models.IntegerField(blank=True, null=False)
    license_id = models.IntegerField(blank=True, null=False)

    class Meta:
        managed = False
        db_table = 'annotations'
        unique_together = (("image_id", "seq_num"),)


class Categories(models.Model):
    class_id = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=30, blank=True, null=True)    
    supercategory = models.CharField(max_length=10, blank=True, null=True)
    metainfo = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categories'


class Images(models.Model):
    image_id = models.IntegerField(blank=True, null=True)
    license_id = models.IntegerField()
    file_name = models.CharField(max_length=50, blank=True, null=True)
    height = models.IntegerField(blank=True, null=True)
    width = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'images'


class Info(models.Model):
    id = models.AutoField(primary_key=True)
    description = models.CharField(max_length=30)
    url = models.CharField(max_length=50)
    version = models.CharField(max_length=3)
    year = models.IntegerField()
    
    class Meta:
        managed = False
        db_table = 'info'

class Licenses(models.Model):
    id = models.AutoField(primary_key=True)
    possession = models.CharField(max_length=20)

    class Meta:
        managed = False
        db_table = 'licenses'