#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Api, Resource

from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, PlayerCharacter, NonPlayerCharacter, Campaign

api = Api(app)

@app.route('/')
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


class CheckSession(Resource):

    def get(self):

        if session.get('user_id'):

            user = User.query.filter(User.id == session['user_id']).first()

            return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

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

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204

        return {'error': '401 Unauthorized'}, 401

class Users(Resource):
    def get(self):

        user_dicts = [user.to_dict() for user in User.query.all()]

        return make_response(
            jsonify(user_dicts),
            200
        )

api.add_resource(Users, '/user', endpoint='user')

class NonPlayerCharacters(Resource):
    def get(self):

        nonplayercharacter_dicts = [non_player_character.to_dict() for non_player_character in NonPlayerCharacter.query.all()]

        return make_response(
            jsonify(nonplayercharacter_dicts),
            200
        )

api.add_resource(NonPlayerCharacters, '/npc', endpoint='npc')

class PlayerCharacters(Resource):
    def get(self):

        playercharacter_dicts = [playercharacter.to_dict() for playercharacter in PlayerCharacter.query.all()]

        return make_response(
            jsonify(playercharacter_dicts),
            200
        )

api.add_resource(PlayerCharacters, '/playercharacter', endpoint='playercharacter')

class Campaigns(Resource):
    def get(self):

        campaign_dicts = [campaign.to_dict() for campaign in Campaign.query.all()]

        return make_response(
            jsonify(campaign_dicts),
            200
        )
api.add_resource(Campaigns, '/campaign', endpoint='campaign')

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


if __name__ == '__main__':
    app.run(port=5555, debug=True)
