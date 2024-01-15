 GLOBAL
-
# project4-frontend
-   Play with React configurations, to know more about react and its configurations and files and stuff, 
    -   Open this link "https://create-react-app.dev/" and start impleminting every thing that can be usefull to you ! I need to milk this DOC (In order to understand React fully)
-   Use some new techniques in scss like variables and css functions() and other...
-   Fix href links of links <a> in navbar
-   Use OOP in python  
-   Create a media dir in django backend in order to store users profile images
-   Create an appropriate __str__ functions inside my models schemas in models.py
-   Create models serlizers and validators
-   Use scss skills like functions and variables
-   Apply some models contraints and validations and error handling (models.py)
-   Drive components from React
-   Add flash messages to react
-   Remove @csrf_token and actually configure csrf tokens in put and post requestsss
-   Remove Follow button from user own posts in feed
-   Add register link in logout !


# project4-backend
-   Add if authenticated or @login_required
-   Add some validation to create_new_post() view function via .serlization methods of the model
-   Use this to serlize and deserlize QuerySets in Django models 
    ```
    from django.core.serializers import serialize

    serialize("json", SomeModel.objects.all(), cls=LazyEncoder)
    ```
-   Get inspiration (COPY) GeekForGeeks page found in "DjangoTipsAndKeys" bookmark
-   Also send each profile image of each User to frontend (like the url of each image)
-   Fix PostHandler() class to approproatly deal with requrst nstead of user_id=1
-   Clean up utils.py PostHandler()!, like maybe create more functions inside it
-   Change manual usaer id to request.user in post view in views.py
-   Remove @csrf exempt from views.py
-   Provide user profilel image for frontend
-   Add UserSerlizer to login view
-   Add loginrequired to each function