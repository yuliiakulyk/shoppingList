//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Detail from "../bricks/shopping-list/detail.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
const shoppingList = {
  name: "Christmas shopping list",
  ownerUuIdentity: "19-6434-1",
  ownerName: "Yuliia Kulyk",
  participantUuIdentityList: ["1-1", "4-1", "642-1-1", "12-444-1"],
  participantNameList: ["Vladimir Kovar", "Radek Dolejs", "Ivo Milota", "Zdenek Koubek"],
  items: [
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e1", name: "Cookies", authorName: "Yuliia Kulyk", solved: false },
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e2", name: "Cake", authorName: "Yuliia Kulyk", solved: false },
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e3", name: "Christmas tree", authorName: "Yuliia Kulyk", solved: false },
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e4", name: "Christmas tree toys", authorName: "Yuliia Kulyk", solved: false },
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e5", name: "Candles", authorName: "Yuliia Kulyk", solved: false },
    { id: "4c1a9edb30aa48ab825d2c5dec3d1b7e6", name: "Wine", authorName: "Yuliia Kulyk", solved: false },
  ],
};
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let ShoppingListDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ShoppingListDetail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListDetail);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Detail data={shoppingList} />
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

ShoppingListDetail = withRoute(ShoppingListDetail, { authenticated: true });
//@@viewOn:exports
export { ShoppingListDetail };
export default ShoppingListDetail;
//@@viewOff:exports
