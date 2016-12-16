# edh-app


## Notes
### React
* using React.PureComponent for some map related components

### Styling
* using less css
* TBD, may use Skeleton (very light grid system)
* __TBD__, __may globally change box model__ via box-sizing (if so see box-sizing.import.less)

### google-map-react
* the map seems to need to be in a div that has a specific height / width, ie 400px
    * 100%, I don't have working yet
    * strangely, if you pass any style={someStyleObj} directly to the GoogleMap component, it will display 100% (and ignores any px)
    * there is a note in the troubleshooting / tips github page, that says the parent component must have width and height, else won't display
    * google maps has a similar issue, you must set html, body, and parent all to 100% height / width, and set the map's parent position: relative (this made google map work)
        * note, this has NOT yet worked for google-map-react
    * setting position to absolute seems one step closer. it displays the map correctly, but will run in to problems eventually with z-index
        * note, google-map-react uses position absolute, and has it working somehow
        