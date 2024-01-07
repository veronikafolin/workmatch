#!/bin/bash

mongoimport --jsonArray --db workmatch --collection students --file tmp/data/Students.json
mongoimport --jsonArray --db workmatch --collection schools --file tmp/data/Schools.json
mongoimport --jsonArray --db workmatch --collection companies --file tmp/data/Companies.json
mongoimport --jsonArray --db workmatch --collection jobOffers --file tmp/data/jobOffers.json
mongoimport --jsonArray --db workmatch --collection notifications --file tmp/data/Notifications.json
mongoimport --jsonArray --db workmatch --collection images --file tmp/data/Images.json