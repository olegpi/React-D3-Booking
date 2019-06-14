#Screenshot

![screenshot](https://user-images.githubusercontent.com/14134220/59480620-4e504000-8e2f-11e9-9b21-3d1e138358c6.gif)


# Description #

Send request to the server, receive response, with description what should draw on the SVG (status, type of shape, position, size etc. )
```
"data":[
   {
      "itemStyle":{
         "shape":"circle",
         "positionX":"100",
         "positionY":"100",
         "radius":"60"
      },
	   "id":"1",
      "status":"busy"
   },
   ...
```
There is **'Panel SVG'**, where drawing dynamic shapes, on the left panel.\
There is **'Panel Filter Buttons'** and list of shapes on the right panel.\

Clicked on the Button in **'Panel Filter Buttons'** customer can choose shapes which have same status (busy, booking, free)  and do filtering list of shapes by **STATUS**.\
Clicked on the shape in **'Panel SVG'** customer do filtering list of shapes by **ID.**

# Get Start #
```
npm install
```
```
json-server --watch db.json --port 3001
```
```
npm start
```

