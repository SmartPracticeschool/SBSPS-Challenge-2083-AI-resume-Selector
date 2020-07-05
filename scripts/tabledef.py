import sys
import os
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

SQLALCHEMY_DATABASE_URI = 'sqlite:///accounts.db'

Base = declarative_base()


def db_connect():
    
    return create_engine(SQLALCHEMY_DATABASE_URI, connect_args={'timeout': 20})


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(30), unique=True)
    password = Column(String(512))
    email = Column(String(50))
    payment = Column(String(6))

    def __repr__(self):
        return '<User %r>' % self.username


engine = db_connect()  
Base.metadata.create_all(engine)  
