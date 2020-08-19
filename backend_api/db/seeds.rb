
require 'rest-client'
Exercise.destroy_all
User.destroy_all
api_URL = "https://wger.de/api/v2/exercise/?language=2&status=2"
rest_client = RestClient::Request.execute(method: :get, url: api_URL, headers: {Authorization: "Token 98e0bc3f9a6818f516770ec54695cf310c4b63d3"}, timeout: 2000)
rest_client_array = JSON.parse(rest_client)
User.create(
  username: 'mnavoy4',
  password: 'mnavoy4',
  height: 72,
  weight: 160,
  frequency_per_week: 4,
  gym_time_per_session: '1hr-1.5hr'
)
rest_client_array.each do |exercise|
  case exercise['muscles'][0]
  when 1, 11, 13
    muscle_group = 'biceps'
  when 2
    muscle_group = 'shoulders'
  when 7, 8, 10, 15
    muscle_group = 'legs'
  when 4, 3
    muscle_group = 'chest'
  when 12, 9
    muscle_group = 'back'
  when 5
    muscle_group = 'triceps'
  when 14, 6
    muscle_group = 'abs'
  end
  if exercise['muscles'] != [] || exercise['description'] != ""
    Exercise.create(
      name: exercise['name'],
      description: exercise['description'],
      muscle_group: muscle_group
    )
  end
end

# Workout.create(
#   user_id: 1,
#   exercises: "6, 7",
#   sets: 5,
#   reps_per_set: 5,
#   strength: true,
#   muscle_group: 'legs'
# )
