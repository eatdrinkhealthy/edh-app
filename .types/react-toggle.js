// Hand creating react-toggle libdef
// props and types listed at https://github.com/aaronshaf/react-toggle
// TODO confirm (or fix), props typechecking is enforced
type ReactToggle$Props = {
  checked?: boolean,
  defaultChecked?: boolean,
  onChange?: Function,
  name?: string,
  id?: string,
  disabled?: boolean,
};

declare module "react-toggle" {
  declare export default class Toggle extends React$Component<any, any, any> {
    props: ReactToggle$Props;
  }
}
