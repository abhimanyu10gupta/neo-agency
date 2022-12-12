import os
from sqlalchemy import Column, String, Integer, Date
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json

db = SQLAlchemy()

database_filename = "database.db"
project_dir = os.path.dirname(os.path.abspath(__file__))
database_path = 'postgresql://postgres:asdasd@localhost:5432/agency'


def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    migrate = Migrate(app, db)
    db.init_app(app)
    # db.drop_all()
    db.create_all()


class Movie(db.Model):
    __tablename__ = 'movies'
    id = Column(Integer(), primary_key=True)
    title = Column(String(80), unique=True)
    release_date = Column(String(80))
    actors = db.relationship('Actor', backref='movies')

    def get_details(self):
        return {
            'id': self.id,
            'title': self.title,
            'releaseDate': self.release_date,
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()


class Actor(db.Model):
    __tablename__ = 'actors'
    id = Column(Integer(), primary_key=True)
    name = Column(String(80))
    age = Column(Integer())
    gender = Column(String(80))
    movie_id = Column(Integer, db.ForeignKey('movies.id'))

    def get_details(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'movie_id': self.movie_id,
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()
