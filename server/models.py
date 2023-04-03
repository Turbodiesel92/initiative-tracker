from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.Varchar)
    campaign = db.Column(db.String)


class PlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'player_characters'

    id = db.Column(db.Integer, primary_key=True)
    character_name = db.Column(db.String)
    initiative = db.Column(db.Integer)
    character_classes = db.Column(db.String)

class NonPlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'non_player_characters'

    id = db.Column(db.Integer, primary_key=True)
    npc_name = db.Column(db.String)
    initiative = db.Column(db.Integer)

class CharacterClass(db.Model, SerializerMixin):
    __tablename__ = 'character_classes'

    id = db.Column(db.Integer, primary_key=True)
    character_classes = db.Column(db.String)
    campaign_id = db.Column(db.Integer)
    character_name = db.Column(db.String)

class Campaign(db.Model, SerializerMixin):
    __tablename__ = 'campaigns'

    id = db.Column(db.Integer, primary_key=True)
    campaign = db.Column(db.String)

class TurnTracker(db.Model, SerializerMixin):
    __tablename__ = 'turn_trackers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.foreignKey('users.id'))
    player_characters_id = db.Column(db.Integer, db.ForeignKey('player_characters.id'))
    non_player_characters_id = db.Column(db.Integer, db.ForeignKey('non_player_characters.id'))
    character_initiative = db.Column(db.Integer)
    non_player_character_initiative = db.Column(db.Integer)
