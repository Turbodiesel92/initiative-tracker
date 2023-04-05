from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize_rules = ('')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    campaign_id = db.Column(db.String)

    campaigns = db.relationship('Campaign', backref='user')

class PlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'player_characters'

    # serialize_rules = ('')

    id = db.Column(db.Integer, primary_key=True)
    pc_name = db.Column(db.String)
    # initiative = db.Column(db.Integer)

    campaigns = db.relationship('Campaign', backref='player_character')

class NonPlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'non_player_characters'

    # serialize_rules = ('')

    id = db.Column(db.Integer, primary_key=True)
    npc_name = db.Column(db.String)
    # initiative = db.Column(db.Integer)

    campaigns = db.relationship('Campaign', backref='non_player_character')

class Campaign(db.Model, SerializerMixin):
    __tablename__ = 'campaigns'

    # serialize_rules = ('')

    id = db.Column(db.Integer, primary_key=True)
    campaign_name = db.Column(db.String)

    user_id =db.Column(db.Integer, db.ForeignKey('users.id'))
    non_player_character_id = db.Column(db.Integer, db.ForeignKey('non_player_characters.id'))
    player_character_id = db.Column(db.Integer, db.ForeignKey('player_characters.id'))

