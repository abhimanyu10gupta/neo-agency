import os
from flask import Flask, request, jsonify, abort

from sqlalchemy import exc
import json
from flask_cors import CORS
import traceback

from models import setup_db, Movie, Actor
from backend.src.auth.auth import AuthError, requires_auth


app = Flask(__name__, static_folder='frontend/build', static_url_path='')
setup_db(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/api/movies', methods=['GET'])
@requires_auth('get:movie-details')
def get_movies(jwt):
    movies = Movie.query.all()
    try:
        movies_formatted = [movie.get_details() for movie in movies]
        return jsonify({
            'success': True,
            'movies': movies_formatted,
        })
    except:
        abort(404)


@app.route('/api/movies/<int:movie_id>/actors', methods=['GET'])
@requires_auth('get:actor-details')
def get_actors(jwt, movie_id):
    actors = Actor.query.filter(Actor.movie_id == movie_id).all()
    try:
        actors_formatted = [actor.get_details() for actor in actors]
        return jsonify({
            'success': True,
            'actors': actors_formatted,
        })
    except:
        abort(404)


@app.route('/api/movies/<int:movie_id>', methods=['DELETE'])
@requires_auth('delete:movie')
def delete_movie(jwt, movie_id):

    movie = Movie.query.filter(
        Movie.id == movie_id).one_or_none()

    if movie is None:
        abort(405)

    movie.delete()

    return jsonify({
        'success': True,
        'delete': movie_id,
    })


@app.route('/api/actors/<int:actor_id>', methods=['DELETE'])
@requires_auth('delete:actor')
def delete_actor(jwt, actor_id):

    actor = Actor.query.filter(
        Actor.id == actor_id).one_or_none()

    if actor is None:
        abort(404)

    actor.delete()

    return jsonify({
        'success': True,
        'delete': actor_id,
    })


@app.route('/api/movies/<int:movie_id>/actors', methods=['POST'])
@requires_auth('post:actors')
def new_actor(self, movie_id):
    name = request.json['name']
    age = request.json['age']
    gender = request.json['gender']

    try:
        actor = Actor(name=name, age=age, gender=gender, movie_id=movie_id)
        actor.insert()
        return jsonify({
            'success': True,
            'actors': actor.get_details(),
        })
    except:
        abort(404)


@app.route('/api/movies', methods=['POST'])
@requires_auth('post:movie')
def new_movie(self):
    title = request.json['title']
    release_date = request.json['releaseDate']
    try:
        movie = Movie(title=title, release_date=release_date)
        movie.insert()
        return jsonify({
            'success': True,
            'movies': movie.get_details(),
        })
    except:
        traceback.print_exc()
        abort(404)


@app.route('/api/movies/<int:movie_id>', methods=['PATCH'])
@requires_auth('patch:movie')
def edit_movie(jwt, movie_id):
    print(request.json)
    title = request.json['title']
    release_date = request.json['releaseDate']
    print("reached")
    movie = Movie.query.filter(
        Movie.id == movie_id).one_or_none()

    if not movie:
        abort(404)
    try:
        movie.title = title
        movie.release_date = release_date
        movie.update()
        return jsonify({
            'success': True,
            'movie': [movie.get_details()]
        })
    except:
        traceback.print_exc()
        abort(405)


@app.route('/api/actors/<int:actor_id>', methods=['PATCH'])
@requires_auth('patch:actor')
def edit_actor(jwt, actor_id):
    print(actor_id)
    name = request.json['name']
    age = request.json['age']
    gender = request.json['gender']
    movie_id = request.json['movie_id']

    actor = Actor.query.filter(
        Actor.id == actor_id).one_or_none()

    if not actor:
        abort(404)
    try:
        actor.name = name
        actor.age = age
        actor.gender = gender
        actor.movie_id = movie_id
        actor.update()
        return jsonify({
            'success': True,
            'movie': [actor.get_details()]
        })
    except:
        abort(405)


# Error Handling
'''
Example error handling for unprocessable entity
'''
'''
@TODO implement error handlers using the @app.errorhandler(error) decorator
    each error handler should return (with approprate messages):
             jsonify({
                    "success": False,
                    "error": 404,
                    "message": "resource not found"
                    }), 404

'''

'''
@TODO implement error handler for 404
    error handler should conform to general task above
'''


@app.errorhandler(404)
def not_found_error(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "Not Found"
    }), 404


@app.errorhandler(422)
def server_error(error):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "Unprocessable"
    }), 422


@app.errorhandler(400)
def server_error(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "Bad Request"
    }), 400


@app.errorhandler(500)
def server_error(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": "Server Error"
    }), 500


@app.errorhandler(405)
def server_error(error):
    return jsonify({
        "success": False,
        "error": 405,
        "message": "Method Not Allowed"
    }), 405


'''
@TODO implement error handler for AuthError
    error handler should conform to general task above
'''


@app.errorhandler(AuthError)
def server_error(AuthError):
    return jsonify({
        "success": AuthError.status_code,
        "error": AuthError.error['code']
    }), AuthError.status_code
