# Instructions pour le Déploiement de l'application 
Ce README explique comment déployer l'application
## Prérequis
Avant de commencer, assurez vous d'avoir installé Docker et Docker Compose

### Etapes de déploiment

1. Cloner le dépot ```git clone https://github.com/merveille-nitcheu/Brands.git```

2. Se deplacer à la racine du projet ```cd Brands```

3. Démarrer les conteneurs ```docker compose up -d --build```

Elle peut prendre un peu de temps 

4. executer les migrations et les seeders lors du premier déploiement  ```docker compose exec backend php artisan migrate --seed ```

5. S'assurer que le port 3002 est accessible et n est pas bloqué par un parefeu 

6. Acceder à l'application via <ip-adress:3002>