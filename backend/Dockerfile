# Dockerfile
FROM php:8.3-fpm-alpine

# Installer les extensions PHP nécessaires et les outils de compilation
RUN apk add --no-cache autoconf gcc git freetype-dev libjpeg-turbo-dev libpng-dev make sqlite-dev zip libc-dev linux-headers \
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

RUN chown -R www-data:www-data /var/www/storage && \
    chmod -R 775 /var/www/storage

COPY .env.example .env

RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && php artisan key:generate \
    && php artisan optimize:clear \
    && php artisan storage:link

# Exposer le port 9000
EXPOSE 9000

# Démarrer PHP-FPM
CMD ["php-fpm"]
