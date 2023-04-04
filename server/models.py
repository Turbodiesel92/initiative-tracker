from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-turn_trackers.user', '-campaigns.users')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.Varchar)
    campaign = db.Column(db.String)

    turn_trackers = db.relationship('TurnTracker', backref='user')


class PlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'player_characters'

    serialize_rules = ('-turn_trackers.player_character',)

    id = db.Column(db.Integer, primary_key=True)
    character_name = db.Column(db.String)
    initiative = db.Column(db.Integer)
    # character_classes = db.Column(db.String)

    turn_tracker = db.relationship('TurnTracker', backref='player_character')

class NonPlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'non_player_characters'

    serialize_rules = ('-turn_tracker.non_player_characters',)

    id = db.Column(db.Integer, primary_key=True)
    npc_name = db.Column(db.String)
    initiative = db.Column(db.Integer)

    turn_tracker = db.relationship('TurnTracker', backref='non_player_character')

# class CharacterClass(db.Model, SerializerMixin):
#     __tablename__ = 'character_classes'

    # serialize_rules = ()

#     id = db.Column(db.Integer, primary_key=True)
#     character_classes = db.Column(db.String)
#     campaign_id = db.Column(db.Integer)
#     character_name = db.Column(db.String)

class Campaign(db.Model, SerializerMixin):
    __tablename__ = 'campaigns'

    serialize_rules = ('-campaign.user', '-campaign.non_player_characters')

    id = db.Column(db.Integer, primary_key=True)
    user_id =db.Column(db.Integer, db.ForeignKey('users.id'))
    campaign = db.Column(db.String)

    users = db.relationship('Users', backref='campaign')
    non_player_characters = db.relationship('NonPlayerCharacters', backref='campaign')

class TurnTracker(db.Model, SerializerMixin):
    __tablename__ = 'turn_trackers'

    serialize_rules = ()

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    player_characters_id = db.Column(db.Integer, db.ForeignKey('player_characters.id'))
    non_player_characters_id = db.Column(db.Integer, db.ForeignKey('non_player_characters.id'))
    character_initiative = db.Column(db.Integer)
    non_player_character_initiative = db.Column(db.Integer)
