## Stage 1: Build Angular application ##

FROM node:8 as builder

COPY / /angularapp

WORKDIR /angularapp

RUN npm install
RUN $(npm bin)/ng build


## stage 2 Run nginx to serve application ##

FROM nginx

COPY --from=builder /angularapp/dist/* /usr/share/nginx/html/

EXPOSE 80
