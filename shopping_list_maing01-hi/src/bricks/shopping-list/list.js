//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi, useState, useSession } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import CreateModal from "./create-modal";
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

const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
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
    const { listData } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, List);
    const [shoppingLists, setShoppingLists] = useState(listData);
    const [createModalOpen, setCreateModalOpen] = useState({ open: false });
    const { identity } = useSession();
    const handleCreateShoppingList = () => setCreateModalOpen({ open: true });
    const handleCloseCreateShoppingList = () => setCreateModalOpen({ open: false });
    function createShoppingList(event) {
      const shoppingList = {
        ...event.data.value,
        id: Utils.String.generateId(),
        ownerName: identity.name,
        ownerUuIdentity: identity.uuIdentity,
        participantUuIdentityList: [],
        participantNameList: [],
        items: []
      };

      setShoppingLists((prevShoppingLists) => [...prevShoppingLists, shoppingList]);
      setCreateModalOpen({ open: false });
      return shoppingList;
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Block
          header="My shopping lists"
          card="full"
          headerType="heading"
          level={5}
          headerSeparator={true}
          actionList={[
            {
              icon: "uugds-plus",
              children: <Lsi lsi={{ cs: "Vytvořit", en: "Create" }} />,
              primary: true,
              onClick: () => handleCreateShoppingList(),
            },
          ]}
        >
          <Uu5Tiles.ControllerProvider data={shoppingLists}>
            <Uu5TilesElements.Grid>
              {({ itemIdentifier, data, displayedData }) => {
                return (
                  <>
                    <Uu5Elements.ListItem
                      key={itemIdentifier}
                      itemIdentifier={itemIdentifier}
                      actionList={[
                        {
                          icon: "mdi-delete",
                          //onClick: () => handleDeleteItem(data.id),
                        },
                      ]}
                    >
                      <Uu5Elements.Grid flow="column" alignItems="center">
                        <Uu5Elements.Link href={"shoppingListDetail"}>{data.name}</Uu5Elements.Link>
                        <Uu5Elements.Text>{`Created by: ${data.ownerName}`}</Uu5Elements.Text>
                      </Uu5Elements.Grid>
                    </Uu5Elements.ListItem>
                  </>
                );
              }}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
          <Content nestingLevel={currentNestingLevel}>{children}</Content>
        </Uu5Elements.Block>
        {createModalOpen.open && <CreateModal onClose={handleCloseCreateShoppingList} onFormSubmit={createShoppingList}/>}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { List };
export default List;
//@@viewOff:exports
