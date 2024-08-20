#!/bin/bash

# Définir les variables
DB_NAME="app-database"
CONTAINER_NAME="elections-mongodb"
BACKUP_DIR_IN_CONTAINER="/data/db/$(date +\%F_\%T)" # Répertoire temporaire dans le conteneur
BACKUP_DIR_ON_HOST="/data/backup-mongodb/elections/$(date +\%F_\%T)" # Répertoire sur l'hôte
MONGO_USER="app-username"
MONGO_PASSWORD="fkDkfDZjMcugqvGfugLvgCBc9LHaIG7ngkeMfZD+7v0P"
AUTH_DB="admin" # Généralement 'admin' pour les super utilisateurs
REMOTE_NAME="gdrive"
REMOTE_DIR="backups/mongodb/elections" # Dossier sur Google Drive

# Exécuter mongodump dans le conteneur
docker exec $CONTAINER_NAME mkdir -p /data/db
docker exec $CONTAINER_NAME mkdir -p $BACKUP_DIR_IN_CONTAINER
docker exec $CONTAINER_NAME mongodump --db $DB_NAME --username $MONGO_USER --password $MONGO_PASSWORD --authenticationDatabase $AUTH_DB --out $BACKUP_DIR_IN_CONTAINER

# Créer le répertoire de destination sur l'hôte
mkdir -p $BACKUP_DIR_ON_HOST

# Copier les fichiers de sauvegarde du conteneur vers l'hôte
docker cp $CONTAINER_NAME:$BACKUP_DIR_IN_CONTAINER/. $BACKUP_DIR_ON_HOST

# Optionnel: supprimer les fichiers de sauvegarde dans le conteneur
docker exec $CONTAINER_NAME rm -rf $BACKUP_DIR_IN_CONTAINER

# Optionnel: supprimer les sauvegardes plus anciennes (par exemple, garder seulement les 7 derniers jours)
find /data/backup-mongodb/ -type d -mtime +7 -exec rm -rf {} \;

rclone copy $BACKUP_DIR_ON_HOST $REMOTE_NAME:$REMOTE_DIR --transfers=4 --checkers=8 --progress
~                                                                                                         