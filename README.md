# edh-app


## Notes
### React
* using React.PureComponent for some map related components

### Styling
* using less css
* using Skeleton, very light grid system
* __NOTE, currently using box-sizing to globally change box model__ (see box-sizing.import.less)
* Initial version relies often on use of z-index
#### Animation
* __FIRST__ DETERMINE if CSS3 is being used in current version of app (and/or see what browser versions support it)
* consider this component for animation sidebar & filter, [react-burger-menu](https://github.com/negomi/react-burger-menu)
* potential component / page transition, [react-router-transition](https://www.npmjs.com/package/react-router-transition)
    

### google-map-react
* the map seems to need to be in a div that has a specific height / width, ie 400px
    * 100%, I don't have working yet
    * strangely, if you pass any style={someStyleObj} directly to the GoogleMap component, it will display 100% (and ignores any px)
    * there is a note in the troubleshooting / tips github page, that says the parent component must have width and height, else won't display
    * google maps has a similar issue, you must set html, body, and parent all to 100% height / width, and set the map's parent position: relative (this made google map work)
        * note, this has NOT yet worked for google-map-react
    * setting position to absolute seems one step closer. it displays the map correctly, but will run in to problems eventually with z-index
        * note, google-map-react uses position absolute, and has it working somehow
        
## Testing

### Notes
* The intention is to be able to use...
    + 'jest / enzyme' for unit testing
    + 'meteor test' for complex integration testing
    + 'chimp' for end to end testing
    
### Test Runner File Naming Conventions

#### Default test file naming conventions for Meteor and Jest
* ['meteor test'](https://guide.meteor.com/testing.html#test-modes):  `"*.test[s].js[x]"` or `"*.spec[s].js[x]"`
* ['meteor test --full-app'](https://guide.meteor.com/testing.html#test-modes): `"*.app-test[s].js"` or `"*.app-spec[s].js"`
    +  NOTE: 'meteor build' and 'meteor test' ignore files in [any 'tests' directories](https://guide.meteor.com/testing.html#test-modes), so tests from other test runners can be kept within the project directory structure
* [jest](http://facebook.github.io/jest/docs/configuration.html#testregex-string): `(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$)`

#### Project test file naming convention
 * The following convention allows you to keep all test file types in the same or an adjacent directory of the system under test, without the test runners picking up the incorrect test file
    + place all meteor test files in the same directory as the module / system under test
    + place all jest unit tests in 'tests' sub directory of the module / system under test
        - [OPTIONAL] set [jest test filenames (testRegex)](http://facebook.github.io/jest/docs/configuration.html#testregex-string) to `(/__tests__/.*|(\\.|/)(test|spec|jest))\\.jsx?$`
    + place all chimp tests in 'tests' sub directory of the project root
        - NOTE: create additional sub directories in this directory to organize tests
 * example:
    + `<project-root>/.../system-under-test/tests/AppContainer.jest.jsx` (tests run by __jest__ only)
    + `<project-root>/.../system-under-test/AppContainer.tests.jsx` (tests run by __'meteor test'__ only)
    + `<project-root>/tests/calledMethods.app-tests.js` (tests run by __'meteor test --full-app'__ only)

### Mocking Meteor packages
* Many commonly used meteor packages were mocked, by creating mock modules, and using the moduleNameMapper configuration setting
    + some details and light exmaples can be seen on this [meteor forum discussion](https://forums.meteor.com/t/mocking-meteor-package-imports-in-jest/27780/9)
* Other helpful meteor mocking resources
    + [jest configuration docs, moduleNameMapper](http://facebook.github.io/jest/docs/configuration.html#modulenamemapper-object-string-string)
    + [example jest meteor mocks (some usable examples)](https://github.com/Astrocoders/jest-meteor-mocks)
* One specific, complex example, was mocking SimpleSchema. It took some effort, and trial and error, to mimic being able to reference a returned function from an inline instantiated object
    + eg  `const myValidator = new SimpleSchema({...}).validator();`
    + see the aldeed:simple-schema.js mock for validator() 
