# CS50Web-Project4-network

## How to run my application

This app is a full stack application with frontend and backend are seperated    

So you have to run and start *backend* and then run and start the *frontend* and then access the frontend via its url, to use the app

### Backend (Server-side)

**mac users**
1. Install virtual python environment  package if not installed `pip install virtualenv  `
2. Create a python virtual environment  

```bash 
# Head to root dir of the server
# Create a virtual env
python3 -m venv venv
```  
p
3. Activate the virtual environment `source ./venv/bin/activate`
4. Install python dependecies `pip install -r requirements.txt`
5. Migrate the database     

```bash
# Head to `project4` folder
cd project4
# Run migration (just in case)
python manage.py migrate

```  
6. Run the server

``` bash
python manage.py runserver
```

### Frontend (Client-side)  

1. Head to root of Frontend application  
```bash
cd project4/network/static/network
```

2. Install npm dependencies

```bash
npm i

```

2. Run the app in develpment

```bash
npm run start
```

3. And then you can access and use the app form the url `localhost:3000` by default