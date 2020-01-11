import { slide as Menu } from 'react-burger-menu';
import React, { Component } from 'react';

class BurgerMenu extends Component {
    showSettings(event) {
        event.preventDefault();
    }
    render() {
        return (
            <div id="outer-container" className="outer-container" >
                <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} left width= { "20%" } disableAutoFocus>
                    <main id="page-wrap">
                        <a id="home" className="menu-item" href="/" width= { "20%" }>Profile</a>
                        <a id="about" className="menu-item" href="/about" width= { "20%" }>Feed</a>
                        <a id="contact" className="menu-item" href="/contact" width= { "20%" }>Logout</a>
                        <a onClick={this.showSettings} className="menu-item--small" href="">Settings</a>
                    </main>
                </Menu>
            </div>
        )
    }
}
export default BurgerMenu;