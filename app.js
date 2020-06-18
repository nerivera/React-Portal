"use strict";

class App extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navigation, null), /*#__PURE__*/React.createElement("div", {
      id: "main"
    }));
  }

}

class Navigation extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement("img", {
      src: "https://portal.ltnglobal.com/images/ltn-logo.png",
      alt: "LTN",
      onClick: () => loadPage("Home"),
      id: "logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "sep"
    }), /*#__PURE__*/React.createElement("div", {
      className: "smallspacediv"
    }), /*#__PURE__*/React.createElement(NavSection, {
      text: "Monitoring"
    }, "View Active Channels: #, View My Channels: #, View All Channels: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Scheduling"
    }, "View Schedule: #, Running Bookings: #, Past Bookings: #, Cancelled Bookings: #, Create New Booking: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Watch"
    }), /*#__PURE__*/React.createElement(NavSection, {
      text: "Notifications"
    }, "Active: #, Recently Ended: #, NOC - Active: #, NOC - Recently Ended: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Directory"
    }, "Studios/Playout: #, Sport-Venues: #, Colleges: #, TV-Stations: #, Broadcasters: #, Headends-MVPD: #, Teleports-Switching-Hubs: #, Locations: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Report"
    }, "Bookings: #, Usage: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Noc"
    }, "Alarms: #, Sites: #, Channels: #, Leaves: #, Flowclients: #, Customer-Events: #, Alert-Configuration: #, Billing: #, Usage-Report: #, Call-Logs: #, Contacts: #, Change-Log: #"), /*#__PURE__*/React.createElement(NavSection, {
      text: "Accounts"
    }, "Portal Users: #, Customer Accounts: #, Customer Account ACL: #, Account Permissions: #, Contracts: #"), /*#__PURE__*/React.createElement("div", {
      className: "spacediv"
    }), /*#__PURE__*/React.createElement(Clock, null), /*#__PURE__*/React.createElement("div", {
      className: "smallspacediv"
    }), /*#__PURE__*/React.createElement(NavSection, {
      text: "Help"
    }), /*#__PURE__*/React.createElement(NavSection, {
      text: "Contact"
    }), /*#__PURE__*/React.createElement(Account, {
      name: "Nilo Rivera",
      pos: "NOC"
    })), /*#__PURE__*/React.createElement("div", {
      id: "subnav",
      className: "nosub"
    }, /*#__PURE__*/React.createElement("div", {
      id: "subcontainer"
    })));
  }

}

class NavSection extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.text || "";
    this.links = {};

    if (props.hasOwnProperty("children")) {
      this.links = JSON.parse("{\"" + props.children.trim().replace(/,$|^,/g, "").replace(/:\s*/g, "\": \"").replace(/,\s*/g, "\", \"") + "\"}");
    }

    this.sel = props.sel == "1";

    if (this.sel) {
      window.onload = () => NavSection.selpage(this.text, this.links);
    }
  }

  static updateSubNavVisibility(links) {
    let sn = document.getElementById("subnav");

    if (JSON.stringify(links) === "{}" && !sn.classList.contains("nosub")) {
      sn.classList.add("nosub");
    } else if (JSON.stringify(links) !== "{}" && sn.classList.contains("nosub")) {
      sn.classList.remove("nosub");
    }
  }

  static renderSubLinks(links) {
    if (JSON.stringify(links) !== "{}") {
      ReactDOM.render(Object.entries(links).map((kvp, i) => /*#__PURE__*/React.createElement(SubSection, {
        text: kvp[0],
        link: kvp[1],
        sel: i === 0 ? "1" : "0",
        key: kvp[0]
      })), document.getElementById("subcontainer"));
    }
  }

  static selpage(text, links) {
    // removes all elements with .selpage
    let cursel = document.getElementsByClassName("selpage");

    for (let i = 0; i < cursel.length; i++) {
      cursel[i].classList.remove("selpage");
    } // finds the button with the matching text and gives it .selpage


    let navbtns = document.getElementsByClassName("navbtn");
    let e;

    for (let i = 0; i < navbtns.length; i++) {
      e = navbtns[i];

      if (e.innerHTML == text) {
        e.classList.add("selpage");
        break;
      }
    }

    NavSection.updateSubNavVisibility(links);
    NavSection.renderSubLinks(links);
    loadPage(Object.keys(links)[0] || text, Object.values(links)[0]);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "navitem"
    }, /*#__PURE__*/React.createElement("button", {
      className: "navbtn" + (this.sel ? " selpage" : ""),
      onClick: () => NavSection.selpage(this.text, this.links)
    }, this.text));
  }

}

class SubSection extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.text || "";
    this.link = props.link || "#";
    this.sel = props.sel === "1";
  }

  static selsubpage(text, link) {
    // removes all elements with .selsubpage
    let cursel = document.getElementsByClassName("selsubpage");

    for (let i = 0; i < cursel.length; i++) {
      cursel[i].classList.remove("selsubpage");
    } // finds the button with the matching text and gives it .selsubpage


    let subbtns = document.getElementsByClassName("subbtn");

    for (let i = 0; i < subbtns.length; i++) {
      let e = subbtns[i];

      if (e.innerHTML == text) {
        e.classList.add("selsubpage");
        break;
      }
    }

    loadPage(text, link);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "navitem"
    }, /*#__PURE__*/React.createElement("button", {
      className: "subbtn" + (this.sel ? " selsubpage" : ""),
      onClick: () => SubSection.selsubpage(this.text, this.link)
    }, this.text));
  }

}

class DropLink extends React.Component {
  constructor(props) {
    super(props);
    this.text = props.children || "";
    this.link = "javascript:loadPage(\"" + this.text + (props.link !== null && props.link !== void 0 ? "\", \"" + props.link : "") + "\")";
  }

  render() {
    return /*#__PURE__*/React.createElement("a", {
      href: this.link,
      key: this.text
    }, this.text);
  }

}

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.avatar = props.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/OOjs_UI_icon_userAvatar.svg/1200px-OOjs_UI_icon_userAvatar.svg.png";
    this.name = props.name !== null && props.name !== void 0 ? props.name : "Fname Lname";
    this.fname = this.name.split(" ")[0];
    this.pos = props.pos || "";
  }

  static droptoggle() {
    let e = document.getElementsByClassName("account")[0];

    if (e.classList.contains("dropon")) {
      e.classList.remove("dropon");
    } else {
      e.classList.add("dropon");
    }

    e.innerHTML += "";
  }

  static dropoff() {
    let e = document.getElementsByClassName("account")[0];

    if (e.classList.contains("dropon")) {
      e.classList.remove("dropon");
    }
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "account",
      onClick: Account.droptoggle,
      onMouseLeave: Account.dropoff
    }, /*#__PURE__*/React.createElement("img", {
      className: "avatar",
      src: this.avatar
    }), /*#__PURE__*/React.createElement("span", null, this.fname), /*#__PURE__*/React.createElement("div", {
      className: "dropdown-content"
    }, /*#__PURE__*/React.createElement("span", null, this.name + (this.pos !== "" ? "\u00a0\u00a0(" + this.pos + ")" : "") // \u00a0 is the hex code for &nbsp;
    ), /*#__PURE__*/React.createElement(DropLink, null, "Edit Profile"), /*#__PURE__*/React.createElement(DropLink, null, "Logout")));
  }

}

class Clock extends React.Component {
  static timeString() {
    // Returns the current system time in the below format
    // hh:mm:ss TZ
    let d = new Date();
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0") + ":" + d.getSeconds().toString().padStart(2, "0") + " " + d.toLocaleTimeString("en-us", {
      timeZoneName: "short"
    }).split(" ")[2];
  }

  render() {
    return /*#__PURE__*/React.createElement("span", {
      className: "clock"
    }, Clock.timeString());
  }

}

function loadPage(text, link = "") {
  switch (text) {
    case "Home":
      NavSection.selpage("", {});
      ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, "Welcome to LTN"), document.getElementById("main"));
      document.title = "Portal | LTN";
      break;

    case "":
      break;

    case "Edit Profile":
      NavSection.selpage("", {});
      ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, "Edit Profile"), document.getElementById("main"));
      document.title = "Edit Profile | LTN";
      break;

    case "Logout":
      NavSection.selpage("", {});
      ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, "Logging Out"), document.getElementById("main"));
      break;

    default:
      ReactDOM.render( /*#__PURE__*/React.createElement("h1", null, text), document.getElementById("main"));
      document.title = text + " | LTN";
  }
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
loadPage("Home");
