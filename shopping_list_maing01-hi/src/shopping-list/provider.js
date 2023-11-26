//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const Provider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Provider",
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

    const shoppingListData = useDataObject({
      handlerMap: {
        load: handleLoad,
        update: handleUpdate,
        addItem: handleAddItem,
        removeItem: handleRemoveItem,
        markItemSolved: handleMarkItemSolved,
        archive: handleArchive,
        setOwner: handleSetOwner,
        leave: handleLeave,
        addMember: handleAddMember,
        removeMember: handleRemoveMember,
      },
    });

    function handleLoad(dtoIn) {
      return Calls.ShoppingList.load(dtoIn);
    }

    function handleUpdate(dtoIn) {
      return Calls.ShoppingList.update(dtoIn);
    }

    function handleAddItem(dtoIn) {
      return Calls.ShoppingList.addItem(dtoIn);
    }

    function handleRemoveItem(dtoIn) {
      return Calls.ShoppingList.removeItem(dtoIn);
    }

    function handleMarkItemSolved(dtoIn) {
      return Calls.ShoppingList.markItemSolved(dtoIn);
    }

    function handleArchive(dtoIn) {
      return Calls.ShoppingList.archive(dtoIn);
    }

    function handleSetOwner(dtoIn) {
      return Calls.ShoppingList.setOwner(dtoIn);
    }

    function handleLeave(dtoIn) {
      return Calls.ShoppingList.leave(dtoIn);
    }

    function handleAddMember(dtoIn) {
      return Calls.ShoppingList.addMember(dtoIn);
    }

    function handleRemoveMember(dtoIn) {
      return Calls.ShoppingList.removeMember(dtoIn);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return typeof props.children === "function" ? props.children(shoppingListData) : props.children;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Provider };
export default Provider;
//@@viewOff:exports
