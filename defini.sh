#!/bin/bash

apiKey="a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

data=$(curl -s "https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=$apiKey")

echo $(echo $data | jq -r .definitions[0].text)
