FROM nginx:1.25.4-alpine

RUN rm -rf /etc/nginx/sites-enabled/default

COPY nginx.conf /etc/nginx/conf.d

WORKDIR /workspace

COPY dist realworld-ui/build

EXPOSE 3000

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]