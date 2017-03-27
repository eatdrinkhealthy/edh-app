// Hand creating react-router libdef, currently for v3
//    -this may need updating as more props are used in source code
// referenced v4 libdef in flowtype definitions

declare module "react-router" {
  declare export class Link extends React$Component {
    props: {
      to: string,
      className?: string,
    }
  }

  declare export class Router extends React$Component {
    props: {
      history: Object,
      children?: React$Element<*>,
    }
  }

  declare export class Route extends React$Component {
    props: {
      path: string,
      component: ReactClass<*>,
    }
  }

  declare export class IndexRoute extends React$Component {
    props: {
      component: ReactClass<*>,
    }
  }

  declare export var browserHistory: Object;
}
