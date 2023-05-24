#!/usr/bin/env python3

from random import randint, choice as rc

from app import app
from models import db, PlayerCharacter, NonPlayerCharacter, User, Campaign, CampaignNpc, CampaignPc

if __name__ == '__main__':
    with app.app_context():

        db.session.query(PlayerCharacter).delete()
        db.session.query(NonPlayerCharacter).delete()
        db.session.query(User).delete()
        db.session.query(Campaign).delete()
        db.session.query(CampaignPc).delete()
        db.session.query(CampaignNpc).delete()


        print("Seeding player_characters...")
        player_characters = [
            PlayerCharacter(pc_name='Cerdic'),
            PlayerCharacter(pc_name='Sithious'),
            PlayerCharacter(pc_name='Sphinx'),
            PlayerCharacter(pc_name='Zero'),
            PlayerCharacter(pc_name='Ka-Dem-Sil'),
            PlayerCharacter(pc_name='Styr Earthaxe'),
            PlayerCharacter(pc_name='Xarxik'),
            PlayerCharacter(pc_name='Whurfim CopperFury'),
            PlayerCharacter(pc_name='Nevarth Lorana'),
            PlayerCharacter(pc_name='Weld Grimburst'),
        ]

        db.session.add_all(player_characters)
        db.session.commit()


        print("Seeding non_player_characters...")
        non_player_characters = [
            NonPlayerCharacter(npc_name='Bodak'),
            NonPlayerCharacter(npc_name='Goblin'),
            NonPlayerCharacter(npc_name='Demogorgon'),
            NonPlayerCharacter(npc_name='Velociraptor'),
            NonPlayerCharacter(npc_name='Pheonix'),
            NonPlayerCharacter(npc_name='Neogi'),
            NonPlayerCharacter(npc_name='Annis Hag'),
            NonPlayerCharacter(npc_name='Chitine'),
            NonPlayerCharacter(npc_name='Rutterkin'),
            NonPlayerCharacter(npc_name='Flail Snail'),
        ]

        db.session.add_all(non_player_characters)
        db.session.commit()

        print("Seeding users")
        users = [
            User(username='Matthew', campaign_id='3'),
        ]

        db.session.add_all(users)
        db.session.commit()

        print("Seeding campaigns...")
        campaigns = [
            Campaign(campaign_name='Wanders Palace'),
            Campaign(campaign_name='Ice Bound Lair')
        ]

        db.session.add_all(campaigns)
        db.session.commit()

        print('Seeding campaign pcs')
        campaign_pcs = [
            CampaignPc(pc_id=1, campaign_id=1),
            CampaignPc(pc_id=2, campaign_id=2),
            CampaignPc(pc_id=3, campaign_id=1),
            CampaignPc(pc_id=4, campaign_id=2),
            CampaignPc(pc_id=5, campaign_id=1),
            CampaignPc(pc_id=6, campaign_id=2),
            CampaignPc(pc_id=7, campaign_id=1),
            CampaignPc(pc_id=8, campaign_id=2),
            CampaignPc(pc_id=9, campaign_id=1),
            CampaignPc(pc_id=10, campaign_id=2)
        ]

        db.session.add_all(campaign_pcs)
        db.session.commit()

        print('Seeding campaign npcs')
        campaignNpcs = [
            CampaignNpc(npc_id = 1, campaign_id = 1),
            CampaignNpc(npc_id = 2, campaign_id = 2),
            CampaignNpc(npc_id = 3, campaign_id = 1),
            CampaignNpc(npc_id = 4, campaign_id = 2),
            CampaignNpc(npc_id = 5, campaign_id = 1),
            CampaignNpc(npc_id = 6, campaign_id = 2),
            CampaignNpc(npc_id = 7, campaign_id = 1),
            CampaignNpc(npc_id = 8, campaign_id = 2),
            CampaignNpc(npc_id = 9, campaign_id = 1),
            CampaignNpc(npc_id = 10, campaign_id = 2),
            CampaignNpc(npc_id = 8, campaign_id = 1),
            CampaignNpc(npc_id = 9, campaign_id = 2),
            CampaignNpc(npc_id = 10, campaign_id = 1)
        ]

        db.session.add_all(campaignNpcs)
        db.session.commit()

        # for player_character in player_characters:
        #     campaign = rc(campaigns)
        #     campaign = Campaign(campaign_name='Wanders Palace')
        #     campaign.player_characters.append(player_character)
        #     campaign.non_player_characters.append(non_player_character)
        #     campaigns.append(campaign)
    print('Done seeding!')


