# Instructions pour le Déploiement de l'application 
Ce README explique comment déployer l'application sur un serveur ubuntu
## Prérequis
Avant de commencer, assurez vous que Docker et Docker Compose sont installés sur votre serveur.

### Etapes de déploiment

1. Cloner le dépot ```git clone https://github.com/merveille-nitcheu/Brands.git```

2. Se deplacer à la racine du projet ```cd Brands```

3. Démarrer les conteneurs ```docker compose up -d --build```

Elle peut prendre un peu de temps pour la premiere fois 

4. executer les migrations et les seeders lors du premier déploiement  ```docker compose exec backend php artisan migrate --seed ```

5. Se déplacer vers le repertoire frontend ```cd frontend```
Modifier apiUrl dans le fichier index.js et y ajouter votre adresse ip

6. Reconstruire apres la modification ```docker compose up -d --build```

7. Configurer le pare-feu afin de rendre les ports 3002 et 8002 accessibles ```sudo ufw allow 8002 /3002```


8. Acceder à l'application via <votre_adresse_ip:3002>