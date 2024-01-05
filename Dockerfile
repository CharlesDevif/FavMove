FROM node:20.5.1 as BUILDER

WORKDIR /app
COPY . .
RUN npm i && npm run build

FROM nginx as DIST
COPY --from=BUILDER /app/dist/ /usr/share/nginx/html
COPY ./nginx/site.conf /etc/nginx/conf.d/default.conf
