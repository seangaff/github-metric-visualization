from github import Github   # github api access
import json                 # for converting a dictionary to a string
import pymongo              # for mongodb access

#we initialise a PyGithub Github object with our access token.
#     note that this token is ours, and now deleted. You must 
#     crete your own access token and use here instead. 
g = Github("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")

#Let's get the user object and build a data dictionary
usr = g.get_user()

dct = {'user': usr.login,
       'fullname': usr.name,
       'location': usr.location,
       'company': usr.company
       }

print ("dictionary is " + json.dumps(dct))

# now let's store the dictionary in a mongodb

# first we need to remove null fields from the dictionary, because
# if we don't we'll end up with null fields in the db. This will cause us
# lots of debugging problems later. The convention is only store actual data
# in the database.

for k, v in dict(dct).items():
    if v is None:
        del dct[k]

print ("cleaned dictionary is " + json.dumps(dct))

# now let's store the data.

# Establish connection
conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)

# Create a database
db = client.classDB

db.githubuser.insert_many([dct])