export interface Utilisateur {
    _id?: string; // Identifiant de l'utilisateur
    prenom: string; // Prénom de l'utilisateur
    nom: string; // Nom de l'utilisateur
    telephone: string; // Numéro de téléphone de l'utilisateur
    mail: string; // Adresse e-mail de l'utilisateur
    password: string; // Mot de passe de l'utilisateur (non nécessaire pour toutes les opérations)
    confirmPassword?: string;
  }
  