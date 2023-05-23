from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-campaigns.user', '-campaigns.non_player_characters')

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    _password_hash = db.Column(db.String)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))


    # campaigns = db.relationship('Campaign', backref='user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class PlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'player_characters'

    serialize_rules = ('-campaigns.player_characters', '-campaign_pcs.pc')

    id = db.Column(db.Integer, primary_key=True)
    pc_name = db.Column(db.String)

    campaign_pcs = db.relationship('CampaignPc', back_populates='pc')
    campaigns = association_proxy('campaign_pcs', 'campaign')

class NonPlayerCharacter(db.Model, SerializerMixin):
    __tablename__ = 'non_player_characters'

    serialize_rules = ('-campaigns.non_player_characters', '-campaign_npcs.npc')

    id = db.Column(db.Integer, primary_key=True)
    npc_name = db.Column(db.String)

    campaign_npcs = db.relationship('CampaignNpc', back_populates='npc')
    campaigns = association_proxy('campaign_npcs', 'campaign')

class Campaign(db.Model, SerializerMixin):
    __tablename__ = 'campaigns'

    serialize_rules = ('-player_characters.campaign', '-non_player_characters.campaign')

    id = db.Column(db.Integer, primary_key=True)
    campaign_name = db.Column(db.String)

    campaign_pcs = db.relationship('CampaignPc', back_populates='campaign')
    player_characters = association_proxy('campaign_pcs', 'pc')


    campaign_npcs = db.relationship('CampaignNpc', back_populates='campaign')
    non_player_characters = association_proxy('campaign_npcs', 'npc')


class CampaignPc(db.Model, SerializerMixin):
    __tablename__ = 'campaign_pcs'

    serialize_rules = ('-campaign.player_characters', '-pc.campaign_pcs')

    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    pc_id = db.Column(db.Integer, db.ForeignKey('player_characters.id'))

    campaign = db.relationship('Campaign', back_populates='campaign_pcs')
    pc = db.relationship('PlayerCharacter', back_populates='campaign_pcs')

    def __init__(self, pc=None):
        self.pc = pc

class CampaignNpc(db.Model, SerializerMixin):
    __tablename__ = 'campaign_npcs'

    serialize_rules = ('-campaign.non_player_characters',)

    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'))
    npc_id = db.Column(db.Integer, db.ForeignKey('non_player_characters.id'))

    campaign = db.relationship('Campaign', back_populates='campaign_npcs')
    npc = db.relationship('NonPlayerCharacter', back_populates='campaign_npcs')

    def __init__(self, npc=None):
        self.npc = npc
