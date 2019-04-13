import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import { Menu } from "antd";
import css from "./style.css";
import Header from "./components/header";
import * as local from "./local";
import Home from "./pages/home";
import Translate from "./pages/translate";

interface IProps {}

class App extends React.Component<IProps> {
  constructor(props: IProps){
    super(props);
  }

  public render(){
    return (
      <div className={css["container"]}>
        <Header />
        <Router>
          <div className={css["content"]}>
            <div className={css["menu"]}>
              <Menu
                style={{ width: 230 }}
                defaultSelectedKeys={['1']}
                mode="inline"
              >
                <Menu.Item key="1">
                  <NavLink to="/">{local.OPTIONS_MENU_I18N_LIST}</NavLink>
                </Menu.Item>
              </Menu>
            </div>
            <div className={css["right-content"]}>
              <Route exact path="/" component={Home}/>
              <Route path="/translate/:id" component={Translate} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#app")
)
