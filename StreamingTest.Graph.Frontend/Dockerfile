FROM node:20-alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY vite.config.js vite.config.js
COPY tsconfig.json tsconfig.json
COPY postcss.config.js postcss.config.js
COPY tailwind.config.js tailwind.config.js
COPY .env.production .env.production

COPY ./src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=build /usr/src/app/src/dist /usr/share/nginx/html
COPY set-env.sh /usr/share/nginx/html/set-env.sh
RUN chmod +x /usr/share/nginx/html/set-env.sh
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["sh", "-c", "cd /usr/share/nginx/html/ && ./set-env.sh && nginx -g 'daemon off;'"]

