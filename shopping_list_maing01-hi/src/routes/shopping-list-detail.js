//@@viewOn:imports
import { createVisualComponent, Utils, Content, DynamicLibraryComponent, useLsi } from "uu5g05";
import Plus4U5App, { RouteController, withRoute } from "uu_plus4u5g02-app";
import Config from "./config/config.js";
import Detail from "../bricks/shopping-list/detail.js";
import Calls from "calls";
import ShoppingListProvider from "../shopping-list/provider.js";
import RouteBar from "../core/route-bar.js";
import List from "../bricks/shopping-list/list";
import DarkModeToggle from "../bricks/dark-mode-toggle";
import importLsi from "../lsi/import-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
const colorSchema = [
  "blue-rich",
  "green-rich",
  "orange-rich",
  "cyan-rich",
  "purple-rich",
  "lime-rich",
  "red-rich",
  "brown-rich",
  "grey-rich",
  "amber-rich",
  "pink-rich",
  "yellow-rich",
];
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
    const lsi = useLsi(importLsi, [ShoppingListDetail.uu5Tag]);
    console.log(lsi)
    function getStatistics(shoppingList) {
      let solvedItems = shoppingList.data.items.filter(item => item.solved);
      let data = [
        // { label: lsi.solved, value: solvedItems.length },
        // { label: lsi.notSolved, value: shoppingList.data.items.length - solvedItems.length },
        { label: "Solved", value: solvedItems.length },
        { label: "Not solved", value: shoppingList.data.items.length - solvedItems.length },
      ];
      return (
        <DynamicLibraryComponent
          uu5Tag="UU5.SimpleChart.PieChart"
          data={data}
          displayLabel
          series={[
            {
              labelKey: "label",
              valueKey: "value",
              colorSchema,
            },
          ]}
        />
      );
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ShoppingListDetail);

    return currentNestingLevel ? (
      <div {...attrs}>
        <RouteBar />
        <ShoppingListProvider>
          {(shoppingList) => (
            <RouteController routeDataObject={shoppingList}>
              <Detail data={shoppingList} />
              {shoppingList.state === "ready" && getStatistics(shoppingList)}
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
