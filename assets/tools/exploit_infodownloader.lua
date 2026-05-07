local HttpService = cloneref(game:GetService("HttpService"))
local ReplicatedStorage = cloneref(game:GetService("ReplicatedStorage"))

local carstats = require(ReplicatedStorage.Configs.CarStats)
local raceinfo = require(ReplicatedStorage.Events.RaceRemotes.RaceInformation)
local racerewards = require(ReplicatedStorage.Events.RaceRemotes.Rewards)

local date = os.date("!%Y-%m-%d")

-- cars
local carStatsJson = HttpService:JSONEncode(carstats)

local carsFinalJson =
'{"lastUpdated": "' .. date .. '", ' ..
string.sub(carStatsJson, 2)

-- races
local combinedraces = {}

for i,v in pairs(raceinfo) do
	combinedraces[i] = {
		Map = v.Map,
		Laps = v.Laps,
		Dificulty = v.Dificulty,
		Rewards = racerewards[i] or {}
	}
end

local racesJson = HttpService:JSONEncode(combinedraces)

local racesFinalJson =
'{"lastUpdated": "' .. date .. '", ' ..
string.sub(racesJson, 2)

-- save
makefolder("czgameinfo")

writefile("czgameinfo/cars.json", carsFinalJson)
writefile("czgameinfo/races.json", racesFinalJson)
