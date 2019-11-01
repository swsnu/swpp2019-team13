# swpp2019-team13

## backend

### settings

Since we use mysql, you should install belows by apt-get

```
sudo apt-get install mysql-server mysql-client
sudo apt-get install libmysqlclient-dev
```

should setting mysql with this [link](https://bscnote.tistory.com/77) at first

### create and load initial sql data

```
mysql -u root club4u < [FILE NAME]
```

- should do after access root with no password and create 'club4u' DB

### PIP requirement

```
pip install django
pip install mysqlclient
pip install pillow
```
