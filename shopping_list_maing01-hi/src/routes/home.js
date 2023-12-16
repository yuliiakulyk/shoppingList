//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, DynamicLibraryComponent } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";
import { RouteController } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import List from "../bricks/shopping-list/list.js";
import ShoppingListListProvider from "../shopping-list/list-provider.js";
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
    function getStatistics(shoppingListList) {
      let data = shoppingListList.data.map((shoppingList) => ({
        label: shoppingList.data.name,
        value: shoppingList.data.itemCount,
      }));
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
        <ShoppingListListProvider>
          {(shoppingListList) => (
            <RouteController routeDataObject={shoppingListList}>
              <List listData={shoppingListList} />
              {shoppingListList.state === "ready" && getStatistics(shoppingListList)}
            </RouteController>
          )}
        </ShoppingListListProvider>
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
