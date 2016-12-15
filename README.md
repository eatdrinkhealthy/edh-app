# edh-app


## Notes

### google-map-react
* the map seems to need to be in a div that has a specific height / width, ie 400px
    * 100%, I don't have working yet
    * strangely, if you pass any style={someStyleObj} directly to the GoogleMap component, it will display 100% (and ignores any px)
    * there is a note in the troubleshooting / tips github page, that says the parent component must have width and height, else won't display
    * google maps has a similar issue, you must set html, body, and parent all to 100% height / width, and set the map's parent position: relative (this made google map work)
        * note, this has NOT yet worked for google-map-react