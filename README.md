# JSON Data Generator

This is a simple utility that generates random JSON data according to user defined schemas.

It uses [dreamjs](https://github.com/adleroliveira/dreamjs).  

A REST and WebSocket client are provided to help get started.  It could prove useful for mocking data feeds to 
automate testing or pump data into dashboard applications.

## Install

git clone https://github.com/tomeustace/json-data-generator.git
npm install

## Entities

There are three sample entities provided by default person, order and stats.  Users can create their own entities by placing their entity json files
 in ./src/json/entities directory.

The ./src/json/entities.json file contains all known entities and needs to be updated with any new entities.

The ./src/json/entity-template.json file contains the entity template.  This allows for common properties to be added to generated json for each entity.
The actual entity data gets plugged in via the 'data' property of the entity-template.  Some users may want to remove this completely, but it is handy 
for tracking events via time if that is required.

The ./src/custom.types.js file is where any addtional custom types for generated data can be defined.  e.g. in order.json there is a Order-Id with value 'id'.
The custom.types.js file contains the 'id' property definition as generated by chancejs library.

## REST Client

### Usage

1. Run "node ./client/rest/rest.serve.js"
2. Open http://localhost:9009/generate/?entity=person,stats&amount=100

## WebSocket Client

### Usage

1. Run "node ./client/websocket/websocket.serve.js"
2. Open http://localhost:9009/generate/?entity=person,stats&amount=100

## Future

Hopefully add a sample dashboard application that consumes the data.
  