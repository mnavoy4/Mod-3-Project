# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# require 'byebug'
# require 'rest-client'
# api_URL = "https://wger.de/api/v2/exercise/?language=2&status=2"
# rest_client = RestClient.get(api_URL, {
#   :Authorization => "Token 98e0bc3f9a6818f516770ec54695cf310c4b63d3"
# })
# byebug
# rest_client_array = JSON.parse(rest_client)
# byebug
# rest_client_array.each do |exercise|
#   Exercise.create(
#     name: exercise[:name],
#     description: exercise[:description],
#     muscle_group: exercise[:muscles][0]
#   )
# end

# User.create(
#   username: "mnavoy4",
#   password: "mnavoy4",
#   height: 72,
#   weight: 165,
#   frequency_per_week: 6,
#   gym_time_per_session: "1-1.5"
# )
