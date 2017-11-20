# edh-app

[![Build Status](https://semaphoreci.com/api/v1/projects/97c77f98-2bd8-4722-afad-d287d5f83770/1169973/shields_badge.svg)](https://semaphoreci.com/eat-drink-healthy/edh-app)

## Installation
* TBD when to use yarn vs. `meteor npm install 'package'`
* NOTE packages that require a binary build step, need to be installed using `meteor npm install`
* Must install bcrypt using `meteor npm install bcrypt`
    - this triggers a binary build step needed for Meteor

## Notes
### React
* using React.PureComponent for some map related components

### Styling
* using less css preprocessor
* using postcss post-process (with plugins: postcss-easy-import, autoprefixer)
* using npm package [html-hint](https://github.com/istarkov/html-hint) to display hints (balloons) for map markers
    - NOTE: istarkov (author of google-map-react), took the hint.css package, and extended it to support html in the hint
        + Although html-hint is free, hint.css is a paid package for commercial use (which I did purchase)
    - Styling customizations for hint-html reside in a local project file, HtmlHintCustomization.import.less
#### CSS Packages
* to include css from npm installed css packages, import the css file in `css-packages.css`
    - this will include the css in the project, as well postcss process / minify the css and bundle it with the rest of the css
* NOTE: trying react-bootstrap (which needs bootstrap.css)
    - installing bootstrap.css via npm
    - removing normalize.import.less and box-sizing.import.less since they are included in bootstrap
    - removing typography.import.less (will re-add any wanted fonts later)
    - removed a lot of unknown body css settings (probably for cordova, will re-add later as needed)
#### Animation
* __FIRST__ DETERMINE if CSS3 is being used in current version of app (and/or see what browser versions support it)
* consider this component for animation sidebar & filter, [react-burger-menu](https://github.com/negomi/react-burger-menu)
* potential component / page transition, [react-router-transition](https://www.npmjs.com/package/react-router-transition)
    

### Map
#### Marker Location / Accuracy
* Google Maps, Google Places API, gps-coordinates.org, Yelp lat lng values all place markers directly on business building
* Foursquare, WHA lat lng values tend to place marker on street or a few meters away
* Google Maps seems to round out to 6th decimal place for accurate placement when using Decimal Degrees
* For the time being, the Foursquare coordinates seem accurate enough for use (typically within meters of Google coordinates). If users provide feedback / requests for greater accuracy (or consistency with Google), consider sourcing address coordinates from Google.
#### google-map-react
* the map seems to need to be in a div that has a specific height / width, ie 400px
    * 100%, I don't have working yet
    * strangely, if you pass any style={someStyleObj} directly to the GoogleMap component, it will display 100% (and ignores any px)
    * there is a note in the troubleshooting / tips github page, that says the parent component must have width and height, else won't display
    * google maps has a similar issue, you must set html, body, and parent all to 100% height / width, and set the map's parent position: relative (this made google map work)
        * note, this has NOT yet worked for google-map-react
    * setting position to absolute seems one step closer. it displays the map correctly, but will run in to problems eventually with z-index
        * note, google-map-react uses position absolute, and has it working somehow

## Development / Debugging
* A global `window.SHOW_GRID` was added to display a border around react-bootstrap columns.
    + this setting also displays the breakpoint screen size in the upper left corner of the body
    + NOTE: this global is not typically set in source code, but more often used in storybook
        - avoid setting this global in source code
                 
## Testing

### Notes
* The intention is to be able to use...
    + 'jest / enzyme' for unit testing
        - test logic, function and module results
        - typically mocking systems not under test, 3rd party and meteor modules
    + 'meteor test' for complex integration testing
        - test module integration
        - test meteor / environment behavior (mocking APIs / modules as needed) 
        - test behavior across client / server connection (mocking " " )
        - test actual external API behavior as needed
    + 'chimp' for end to end testing
        - test UI and application flow
    
> NOTE: It is more common or advantageous to run integration tests using 'meteor test --full-app'. Although load time is slightly slower, it does allow tests to be run across the client server divide. At this time, there is not a known significant benefit for running non '--full-app' integration tests in addition to running the '--full-app' integration tests. (running both, takes significantly longer)

### Test Runner File Naming Conventions

#### Default test file names / locations for Jest, Meteor, and Chimp
* [jest](http://facebook.github.io/jest/docs/configuration.html#testregex-string):
  - loads all test files: `(/tests/.*|(\\.jest\\.jsx?$)`
* ['meteor test'](https://guide.meteor.com/testing.html#test-modes):
  - loads all test files: `"*.test[s].js[x]"` or `"*.spec[s].js[x]"`
      + ignores any files in any `tests/` directory
  - DOES NOT eagerly load application code, only modules imported by tests
* ['meteor test --full-app'](https://guide.meteor.com/testing.html#test-modes): 
  - loads all test files: `"*.app-test[s].js"` or `"*.app-spec[s].js"`
      + ignores any files in any `tests/` directory
  - DOES eagerly load application code, as meteor build normally would
* [chimp](https://chimp.readme.io/docs/command-line-options):
  - loads end to end tests from: `tests/end-to-end`
  - test files should be named `*_spec.js`
  - __RECOMMENDED__: run meteor server in test mode, this uses the meteor test database instead of development database (there is a package.json script to do so)

#### Project test file location and naming convention
 * The following convention allows you to colocate test files in the same or sub directory of the system under test, without the test runners picking up the incorrect test file
    + place all meteor test files in the same directory as the module / system under test
    + place all jest unit tests in 'tests' sub directory of the module / system under test
        - set [jest test filenames (testRegex)](http://facebook.github.io/jest/docs/configuration.html#testregex-string) to `/tests/.*\\.jest\\.jsx?$`
        - jest file name convention `filename.jest.js[x]`
    + place all chimp tests in 'tests' sub directory of the project root
        - NOTE: create additional sub directories in this directory to organize tests
 * example:
    + `<project-root>/.../system-under-test/tests/Navbar.jest.jsx` (tests run by __jest__ only)
    + `<project-root>/.../system-under-test/Navbar.tests.jsx` (tests run by __'meteor test'__ only)
    + `<project-root>/.../system-under-test/calledMethods.app-tests.js` (tests run by __'meteor test --full-app'__ only)
    + `<project-root>/tests/end-to-end/.../*_spec.js` (tests to be run by __'chimp'__)
    
  NOTE: placing all 'non meteor application' code, such as tests and storybook stories, in `tests/` directories prevents meteor server from restarting when in development mode

#### Assertions
Each testing framework comes with a default, or set of available assertion libraries. To avoid the confusion of mixing similar libraries (e.g., jest's jasmine based expect & practicalmeteor's chai based expect), use the following specified assertion libraries for each test framework.
* For unit / jest testing, use the jest provided assertions [(expect)](https://facebook.github.io/jest/docs/expect.html).
* For integration testing (`meteor test`), use practicalmeteor:chai assert.

### Jest
#### Mocking Meteor packages
* Many commonly used meteor packages were mocked, by creating mock modules, and using the moduleNameMapper configuration setting
    + some details and light exmaples can be seen on this [meteor forum discussion](https://forums.meteor.com/t/mocking-meteor-package-imports-in-jest/27780/9)
* Other helpful meteor mocking resources
    + [jest configuration docs, moduleNameMapper](http://facebook.github.io/jest/docs/configuration.html#modulenamemapper-object-string-string)
    + [example jest meteor mocks (some usable examples)](https://github.com/Astrocoders/jest-meteor-mocks)
* One specific, complex example, was mocking SimpleSchema. It took some effort, and trial and error, to mimic being able to reference a returned function from an inline instantiated object
    + eg  `const myValidator = new SimpleSchema({...}).validator();`
    + see the aldeed:simple-schema.js mock for validator() 
#### Snapshots
* when initially creating, or even updating, __be sure to examine the contents of the snapshot file__
    - it is possible to capture incorrect code or even 'undefined' in cases
* snapshot files are to be kept in the default location, a `__snapshots__` subdirectory
    
### Chimp
* Install chimp globally
    - this prevents an in issue sometimes arising when deploying to galaxy (an error installing chromedriver)
    - also, as of 10/19/17, yarn was failing on chimp install (so easier to install globally using 'npm')
* Continuous Integration
    - in order for all test tiers to succeed, it 'seemed' a pause of around 5 seconds was needed between the integration and end-to-end tests. Else, the end-to-end test would get random failures (timeouts, elements not found)
* NOTE (strange behavior):
    - when searching two times in a row in a test, for an element that is wrapped in a createContainer, the second search may fail
        + e.g. waitForExist(someButton), then click(someButton) may result in an 'element not found on page' error on the click call

## Storybook
* Story file location and naming convention
    - story file names are to follow the convetion `filename.stories.js`
    - story files are to be placed in a `tests/__stories__/` subdirectory of the module / component      

## Flow
* flow package installed
    - place 3rd party and custom created libdefs in `.types/`  (see setting in .flowconfig file)
* list notable flowtype conventions here
    - React flow type definitions can be found in [Flow's lib](https://github.com/facebook/flow/blob/master/lib/react.js)
    - In general, annotate return types of functions, arrow functions, class methods
      + NOTE: the render method can be assumed to return a `React$Element<*>`, and you can disable the  flowtype/require-return-type warning for that line
        - OPTION: there is an eslint flowtype rule setting, ["excludeMatching"](https://github.com/gajus/eslint-plugin-flowtype#require-return-type), that can exclude functions by file name pattern (as of 3/17/17, there was a [GH issue](https://github.com/gajus/eslint-plugin-flowtype/issues/189) where this setting does not work for class methods, but hopefully will be resolved, and can then be used)
    - Explicitly show optional props as optional using '?' (note, flow can automatically determine it is optional if a default props value is set for the prop; however explicitly showing it is optional is more readable)
* Flowtype linting is done using an [eslint package for flowtype](https://github.com/gajus/eslint-plugin-flowtype)
    - this generates flow type errors simply by linting (may make flow less or unnecessary?)
* Use `flow-typed` package to download community created libdefs and create generic libdefs for installed pacakges
    - flow-typed libdefs reside in `flow-typed/`, which is git ignored
    - copy or move libdefs from there to `.types/` and edit as needed
    - they can be checked in to the repo from `.types/`
    - NOTE, anytime you download libdefs in to `flow-typed/`, you need to nuke or hide that directory, else Meteor will see it and try to load it
    
## Credits / Props / Inspirations
* Work Hard Anywhere - many of the UI characteristics
* google-map-react
    - the map component
    - marker balloon pop up behavior (see their main example online) 