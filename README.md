# Club4U

[![Build Status](https://travis-ci.com/swsnu/swpp2019-team13.svg?branch=master)](https://travis-ci.com/swsnu/swpp2019-team13)
[![Coverage Status](https://coveralls.io/repos/github/swsnu/swpp2019-team13/badge.svg?branch=master)](https://coveralls.io/github/swsnu/swpp2019-team13?branch=master)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=swsnu_swpp2019-team13&metric=alert_status)](https://sonarcloud.io/dashboard?id=swsnu_swpp2019-team13)

## Frontend

### Run

```
npm install
npm start
```

### Test

```
npm test -- --coverage --watchAll=False
```

### ESLint

```
./node_modules/.bin/eslint src
```

## Backend

### Requirement

#### MySQL

**<u>Linux</u>**

Since we use mysql, you should install belows by apt-get

```
sudo apt-get install mysql-server mysql-client
sudo apt-get install libmysqlclient-dev
sudo apt-get install pylint
sudo apt-get install libpq-dev python-dev
```

should setting mysql with this [link](https://bscnote.tistory.com/77) at first

##### create and load initial sql data

```
mysql -u root club4u < [FILE NAME]
```

- should do after access root with no password and create 'club4u' DB

<u>**Window**</u>

1. install mysql server manually in https://dev.mysql.com/downloads/installer/
2. install l mysql client using whl (ref : https://hyunyikim.tistory.com/9 )
3. install mysql workbench in https://dev.mysql.com/downloads/workbench/
4. create new schema "club4u"
5. open sql file, and double click club4u schema, then execute sql
6. `python manage.py makemigrations`
7. `python manage.py migrate`
8. done!

#### PIP requirement

```
pip install -r backend/requirements.txt
```

### Run

```
python manage.py runserver
```

should be done when the virtual-env is activated

### Test

```
coverage run --branch --source='./club4u' manage.py test
coverage report --show-missing
```

### pylint

```
pylint --load-plugins pylint_django */models.py */views.py */test/*.py --disable='C0103, R1705, C0301, R0904, R0801, C0412, C0114, C0115, C0116, W0511, C0330, C0303, W0614, W0401, R1721, R0912, R0914, R0915, C0200, W0621, W0221, C0326, W0612, W0613'
```
