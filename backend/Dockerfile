# Dockerfile
FROM php:8.3-fpm-alpine

# Installer les extensions PHP nécessaires et les outils de compilation
RUN apk add --no-cache autoconf gcc git freetype-dev libjpeg-turbo-dev libpng-dev make sqlite-dev zip libc-dev linux-headers nginx \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql pdo_sqlite \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug

# Définir le répertoire de travail
WORKDIR /var/www

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copier le code de l'application
COPY . .

RUN chown -R www-data:www-data /var/www/storage
RUN chmod -R 775 /var/www/storage

COPY .env.example .env

RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && php artisan key:generate \
    && php artisan storage:link

COPY nginx.conf /etc/nginx/http.d/default.conf

# Exposer le port 80 de nginx
EXPOSE 80

# Démarrer PHP-FPM et nginx
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & php-fpm"]
