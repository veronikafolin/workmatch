#!/bin/bash

mongoimport --jsonArray --db workmatch --collection students --file tmp/data/Students.json
mongoimport --jsonArray --db workmatch --collection schools --file tmp/data/Schools.json
mongoimport --jsonArray --db workmatch --collection companies --file tmp/data/Companies.json