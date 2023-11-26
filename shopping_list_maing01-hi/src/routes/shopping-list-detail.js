//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import Plus4U5App, { RouteController, withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Detail from "../bricks/shopping-list/detail.js";
import Calls from "calls";
import ShoppingListProvider from "../shopping-list/provider.js";
import List from "../bricks/shopping-list/list";
//@@viewOff:imports

//@@viewOn:constants
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
        <ShoppingListProvider>
          {(shoppingList) => (
            <RouteController routeDataObject={shoppingList}>
              <Detail data={shoppingList} />
              <Content nestingLevel={currentNestingLevel}>{children}</Content>
            </RouteController>
          )}
        </ShoppingListProvider>
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
