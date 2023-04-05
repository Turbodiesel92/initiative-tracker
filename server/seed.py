#!/usr/bin/env python3

from random import randint, choice as rc

from app import app
from models import db, PlayerCharacter, NonPlayerCharacter, User, Campaign, TurnTracker

if __name__ == '__main__':
    with app.app_context():
        # print('Clearing db...')
        # PlayerCharacter.query.delete()
        # NonPlayerCharacter.query.delete()
        # User.query.delete()
        # Campaign.query.delete()
        # TurnTracker.query.delete()

        print("Seeding player_characters...")
        player_characters = [
            PlayerCharacter(name='Cerdic'),
            PlayerCharacter(name='Sithious'),
            PlayerCharacter(name='Sphinx'),
            PlayerCharacter(name='Zero'),
            PlayerCharacter(name='Ka-Dem-Sil'),
            PlayerCharacter(name='Styr Earthaxe'),
            PlayerCharacter(name='Xarxik'),
            PlayerCharacter(name='Whurfim CopperFury'),
            PlayerCharacter(name='Nevarth Lorana'),
            PlayerCharacter(name='Weld Grimburst'),
        ]

        db.session.add_all(player_characters)
        db.session.commit()


        print("Seeding non_player_characters...")
        non_player_characters = [
            NonPlayerCharacter(name='Bodak'),
            NonPlayerCharacter(name='Goblin'),
            NonPlayerCharacter(name='Demogorgon'),
            NonPlayerCharacter(name='Velociraptor'),
            NonPlayerCharacter(name='Pheonix'),
            NonPlayerCharacter(name='Neogi'),
            NonPlayerCharacter(name='Annis Hag'),
            NonPlayerCharacter(name='Chitine'),
            NonPlayerCharacter(name='Rutterkin'),
            NonPlayerCharacter(name='Flail Snail'),
        ]

        db.session.add_all(non_player_characters)
        db.session.commit()

        print("Seeding users")
        users = [
            User(username='Matthew'),
            User(password='1234abcd'),
            User(campaign_name='Wanders Palace'),

        ]

        db.session.add_all(users)
        db.session.commit()

        print("Seeding campaigns...")
        campaigns = []
        for playercharacter in player_characters:
            nonplayercharacter = rc(non_player_characters)
            campaigns.append(
                Campaign(player_character=playercharacter, non_player_character=nonplayercharacter)
            )
        db.session.add_all(campaigns)
        db.session.commit()

    print('Done seeding!')


