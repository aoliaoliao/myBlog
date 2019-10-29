import React, { Component } from "react"; //引入react
import { Route, Switch, HashRouter, Redirect } from "react-router-dom"; //引入路由控制

import RouterConfig from "./routerConifg";

class slefConfig extends Component {
  
}



class index extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.userData);
    }

    componentWillMount() {
        //在这里初始化token
        this.setState({ isLoading: true });
        setTimeout(() => {
            this.setState({ isLoading: false });
        }, 20);
    }

    render() {
        let { isLoading } = this.state;
        if (isLoading) {
            return <p>页面加载中！~~~</p>;
        } else {
            return (
                <HashRouter>
                    <div className={"min-height"}>
                        {/*<Header></Header>*/}
                        <Switch>
                            {Routers.map((item, index) => {
                                return (
                                    <Route
                                        key={index}
                                        path={item.path}
                                        exact
                                        render={props => {
                                            let token = this.props.store.getState()[
                                                "userData"
                                            ]["name"];
                                            if (!item.auth || token) {
                                                return (
                                                    <item.component
                                                        {...props}
                                                    />
                                                );
                                            } else {
                                                return (
                                                    <Redirect
                                                        to={{
                                                            pathname:
                                                                "/contact",
                                                            state: {
                                                                from:
                                                                    props.location,
                                                                name: item.title
                                                            }
                                                        }}
                                                    />
                                                );
                                            }
                                            document.title = item.title;
                                        }}
                                    />
                                );
                            })}
                            <Route component={noMatch} />
                        </Switch>
                        <Footer />
                    </div>
                </HashRouter>
            );
        }
    }
}

export default index;
