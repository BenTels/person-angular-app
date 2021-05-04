FROM httpd:latest
COPY ./dist/person-angular-app/ /usr/local/apache2/htdocs/
