//@@viewOn:imports
import { createComponent, useDataList } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //const { children } = props;
    const shoppingListDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        delete: handleDelete,
      },
    });

    function handleLoad(dtoIn) {
      return Calls.ShoppingList.list(dtoIn);
    }

    function handleCreate(dtoIn) {
      return Calls.ShoppingList.create(dtoIn);
    }

    function handleDelete(dtoIn) {
      console.log('itemHandlerMap.handleDelete called with ', dtoIn);
      return Calls.ShoppingList.delete(dtoIn);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(shoppingListDataList) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListProvider };
export default ListProvider;
//@@viewOff:exports
