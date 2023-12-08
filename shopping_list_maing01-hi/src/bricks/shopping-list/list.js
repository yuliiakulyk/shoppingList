//@@viewOn:imports
import { createVisualComponent, Utils, Content, Lsi, useState, useSession, useLsi } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useAlertBus } from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "./config/config.js";
import CreateModal from "./create-modal";
import DeleteModal from "./delete-modal";
import importLsi from "../../lsi/import-lsi";
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

const ListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ListView",
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
    let shoppingLists = listData.data;
    const { addAlert } = useAlertBus();
    const lsi = useLsi(importLsi, [ListView.uu5Tag]);
    function showError(error, header = "") {
      addAlert({
        header,
        message: error.message,
        priority: "error",
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, ListView);
    //const [shoppingLists, setShoppingLists] = useState(listData.data);
    const [createModalOpen, setCreateModalOpen] = useState({ open: false });
    const [deleteModalOpen, setDeleteModalOpen] = useState({ open: false });
    const { identity } = useSession();
    const handleOpenCreateModal = () => setCreateModalOpen({ open: true });
    const handleOpenDeleteModal = (shoppingListId, itemDeleteHandler) => {
      console.log('itemDeleteHandler', itemDeleteHandler)
      setDeleteModalOpen({ open: true, shoppingListId, itemDeleteHandler });
    }
    const handleCloseCreateModal = () => setCreateModalOpen({ open: false });
    const handleCloseDeleteModal = () => setDeleteModalOpen({ open: false });

    async function createShoppingList(event) {
      let response;
      try {
        response = await listData.handlerMap.create(event.data.value);
      } catch (error) {
        showError(error, lsi.createFailed);
      }
      setCreateModalOpen({ open: false });
      let warningCodes = Object.keys(response.uuAppErrorMap).filter(code => response.uuAppErrorMap[code].type === "warning");
      warningCodes.length === 0 &&
        addAlert({
          message: Utils.String.format(lsi.shoppingListCreated, event.data.value.name),
          priority: "success",
          durationMs: 2000,
        });

      warningCodes.length > 0 &&
        addAlert({
          message: response.uuAppErrorMap[warningCodes[0]].message,
          priority: "warning",
          durationMs: 2000,
        });
    }

    function deleteShoppingList() {
      deleteModalOpen.itemDeleteHandler({ id: deleteModalOpen.shoppingListId });
      setDeleteModalOpen({ open: false, shoppingListId: undefined });
    }

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Block
          header={lsi.header}
          card="full"
          headerType="heading"
          level={5}
          headerSeparator={true}
          actionList={[
            {
              icon: "uugds-plus",
              children: lsi.create,
              primary: true,
              onClick: () => handleOpenCreateModal(),
            },
          ]}
        >
          <Uu5Tiles.ControllerProvider data={shoppingLists}>
            <Uu5TilesElements.Grid>
              {({ itemIdentifier, data, displayedData }) => {
                let handlerMap = data.handlerMap;
                data = data.data;
                return (
                  <>
                    <Uu5Elements.ListItem
                      key={itemIdentifier}
                      itemIdentifier={itemIdentifier}
                      actionList={[
                        {
                          icon: "mdi-delete",
                          onClick: () => handleOpenDeleteModal(data.id, handlerMap.delete),
                          disabled: identity?.name !== data?.ownerName,
                        },
                      ]}
                    >
                      <Uu5Elements.Grid flow="column" alignItems="center">
                        <Uu5Elements.Link href={"shoppingListDetail"}>{data?.name}</Uu5Elements.Link>
                        <Uu5Elements.Text>{`${lsi.ownedBy}: ${data?.ownerName}`}</Uu5Elements.Text>
                      </Uu5Elements.Grid>
                    </Uu5Elements.ListItem>
                  </>
                );
              }}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
          <Content nestingLevel={currentNestingLevel}>{children}</Content>
        </Uu5Elements.Block>
        {createModalOpen.open && <CreateModal onClose={handleCloseCreateModal} onFormSubmit={createShoppingList} />}
        {deleteModalOpen.open && <DeleteModal onClose={handleCloseDeleteModal} onFormSubmit={deleteShoppingList} shoppingListId={deleteModalOpen.shoppingListId}/>}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ListView };
export default ListView;
//@@viewOff:exports
