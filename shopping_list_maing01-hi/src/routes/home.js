//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import Detail from "../bricks/shopping-list/detail.js";
//@@viewOff:imports

//@@viewOn:constants
const shoppingList = {
  name: "Christmas shopping list",
  ownerUuIdentity: "19-6434-1",
  ownerName: "Yuliia Kulyk",
  participantUuIdentityList: ["1-1", "4-1", "642-1-1", "12-444-1"],
  participantNameList: ["Vladimir Kovar", "Radek Dolejs", "Ivo Milota", "Zdenek Koubek"],
  items: [
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e1", name: "Cookies", authorName: "Yuliia Kulyk", solved: false},
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e2", name: "Cake", authorName: "Yuliia Kulyk", solved: false},
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e3", name: "Christmas tree", authorName: "Yuliia Kulyk", solved: false},
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e4", name: "Christmas tree toys", authorName: "Yuliia Kulyk", solved: false},
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e5", name: "Candles", authorName: "Yuliia Kulyk", solved: false},
    {id: "4c1a9edb30aa48ab825d2c5dec3d1b7e6", name: "Wine", authorName: "Yuliia Kulyk", solved: false},
  ]};
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { identity } = useSession();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <WelcomeRow left={<Plus4U5Elements.PersonPhoto size="xl" borderRadius="none" />}>
          <Uu5Elements.Text category="story" segment="heading" type="h2">
            <Lsi import={importLsi} path={["Home", "welcome"]} />
          </Uu5Elements.Text>
          {identity && (
            <Uu5Elements.Text category="story" segment="heading" type="h2">
              {identity.name}
            </Uu5Elements.Text>
          )}
        </WelcomeRow>
        <Detail data={shoppingList}/>
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
