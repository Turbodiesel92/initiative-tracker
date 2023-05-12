#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Api, Resource
from sqlalchemy.orm import validates
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, PlayerCharacter, NonPlayerCharacter, Campaign

api = Api(app)

@app.route('/home')
def home():
    return ''

class Signup(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User(
            username=username,
        )

        # the setter will encrypt this
        user.password_hash = password

        print('first')

        try:

            print('here!')

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            print(user.to_dict())

            return user.to_dict(), 201

        except IntegrityError:

            print('no, here!')

            return {'error': '422 Unprocessable Entity'}, 422

api.add_resource(Signup, '/signup', endpoint='signup')

class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):

    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204

        return {'error': '401 Unauthorized'}, 401

api.add_resource(Logout, '/logout', endpoint='logout')

class Users(Resource):
    def get(self):

        user_dicts = [user.to_dict() for user in User.query.all()]

        return make_response(
            jsonify(user_dicts),
            200
        )

    @validates('user')
    def validate_user(self, key, user):
        if user != '':
            raise ValueError('Username must be a string')
        return user

api.add_resource(Users, '/user', endpoint='user')

class NonPlayerCharacters(Resource):
    def get(self):

        nonplayercharacter_dicts = [non_player_character.to_dict() for non_player_character in NonPlayerCharacter.query.all()]

        return make_response(
            jsonify(nonplayercharacter_dicts),
            200
        )

    def post(self):

        try:
            new_npc = NonPlayerCharacter(
                npc_name=request.get_json()['npc_name'],
            )

            db.session.add(new_npc)
            db.session.commit()

            nonplayercharacter_dicts = [nonplayercharacter.to_dict() for nonplayercharacter in NonPlayerCharacter.query.all()]

            return make_response(
                jsonify(nonplayercharacter_dicts),
                201
            )
        except:
            return make_response(
                {'error': ["validation errors"] },
                400
            )

    def patch(self, npc_id):
        try:
            npc_to_update = NonPlayerCharacter.query.get_or_404(npc_id)
            npc_to_update.npc_name = request.get_json().get('npc_name')

            db.session.add(npc_to_update)
            db.session.commit()

            return make_response(
                {'message': 'NPC updated Successfully'},
                200
            )
        except:
            return make_response(
                {'error': ['Failed to update NPC']},
                400
            )

    def delete(self, npc_id):
        npc_to_delete = NonPlayerCharacter.query.get_or_404(npc_id)

        db.session.delete(npc_to_delete)
        db.session.commit()

        return make_response(
            {'message': 'NPC deleted Successfully'},
            200
        )

api.add_resource(NonPlayerCharacters, '/npc', '/npc/<int:npc_id>', endpoint='npc')

class PlayerCharacters(Resource):
    def get(self):

        playercharacter_dicts = [playercharacter.to_dict() for playercharacter in PlayerCharacter.query.all()]

        return make_response(
            jsonify(playercharacter_dicts),
            200
        )

    def post(self):

        try:
            new_pc = PlayerCharacter(
                pc_name=request.get_json()['pc_name'],
            )

            db.session.add(new_pc)
            db.session.commit()

            playercharacter_dicts = [playercharacter.to_dict() for playercharacter in PlayerCharacter.query.all()]

            return make_response(
                jsonify(playercharacter_dicts),
                201
            )
        except:
            return make_response(
                {'error': ["validation errors"] },
                400
            )

    def patch(self, pc_id):
        try:
            pc_to_update = PlayerCharacter.query.get_or_404(pc_id)
            pc_to_update.pc_name = request.get_json().get('pc_name')

            db.session.add(pc_to_update)
            db.session.commit()

            return make_response(
                {'message': 'Player character updated successfully'},
                200
            )
        except:
            return make_response(
                {'error': ['Failed to update player character']},
                400
            )

    def delete(self, pc_id):
        pc_to_delete = PlayerCharacter.query.get_or_404(pc_id)

        db.session.delete(pc_to_delete)
        db.session.commit()

        return make_response(
            {'message': 'NPC deleted Successfully'},
            200
        )

api.add_resource(PlayerCharacters, '/playercharacter', '/playercharacter/<int:pc_id>', endpoint='playercharacter')


class Campaigns(Resource):
    def get(self):

        campaign_dicts = [campaign.to_dict() for campaign in Campaign.query.all()]

        return make_response(
            jsonify(campaign_dicts),
            200
        )

    def post(self):

        try:
            new_campaign = Campaign(
                campaign_name=request.get_json()['campaign_name'],
            )

            db.session.add(new_campaign)
            db.session.commit()

            campaign_dicts = [campaign.to_dict() for campaign in Campaign.query.all()]

            return make_response(
                jsonify(campaign_dicts),
                201
            )
        except:
            return make_response(
                {'error': ["validation errors"] },
                400
            )

    def patch(self, campaign_id):
        try:
            campaign_to_update = Campaign.query.get_or_404(campaign_id)
            campaign_to_update.campaign_name = request.get_json().get('campaign_name')

            db.session.add(campaign_to_update)
            db.session.commit()

            return make_response(
                {'message': 'Campaign updated successfully'},
                200
            )
        except:
            return make_response(
                {'error': ['Failed to update campaign']},
                400
            )

    def delete(self, campaign_id):
        campaign_to_delete = Campaign.query.get_or_404(campaign_id)

        db.session.delete(campaign_to_delete)
        db.session.commit()

        return make_response(
            {'message': 'Campaign deleted Successfully'},
            200
        )

api.add_resource(Campaigns, '/campaign', '/campaign/<int:campaign_id>', endpoint='campaign')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
