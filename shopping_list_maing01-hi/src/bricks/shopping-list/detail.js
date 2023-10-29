//@@viewOn:imports
import { createVisualComponent, Utils, Content, useState, Lsi, useSession, useDataController } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";
// import UuPlus4UPeople from "uu_plus4upeopleg01";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
const FILTER_DEFINITION_LIST = [
  {
    key: "solved",
    filter: (item, filterValue) => {
      filterValue === "Solved only" ? item.solved === true : true;
    },
    label: "Solved",
    inputType: "text-select",
    inputProps: {
      itemList: [
        { placeholder: "Solved only", value: "Solved only" },
        { placeholder: "All", value: "All" },
      ],
      multiple: false,
    },
  },
];
const FILTER_LIST = [
  { key: "solved", value: "Solved only" },
  { key: "solved", value: "All" },
];
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  // propTypes: {
  //   data: PropTypes.shape({
  //     name: PropTypes.string,
  //     items: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         id: PropTypes.string.isRequired,
  //         name: PropTypes.string,
  //         solved: PropTypes.bool,
  //       })
  //     ),
  //   }).isRequired,
  //   disabled: PropTypes.bool,
  //   theme: PropTypes.oneOf(["light", "dark"]),
  // },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { identity } = useSession();

    function handleAddItem() {
      setItems((prevValue) => {
        const newItem = { id: new Date().getTime(), name: null, solved: false, authorName: identity.name };
        return [...prevValue, newItem];
      });
    }

    function handleUpdateItem(id, key, value) {
      setItems((prevItemList) => {
        return prevItemList.map((item) => {
          if (item.id === id) {
            item[key] = value;
          }
          return item;
        });
      });
    }

    function handleDeleteItem(id) {
      setItems((prevItemList) => {
        return prevItemList.filter((item) => {
          return item.id !== id;
        });
      });
    }

    function handleUpdateName(newName) {
      setShoppingListInfo((prevShoppingListInfo) => {
        let newShoppingListInfo = { ...prevShoppingListInfo };
        newShoppingListInfo.name = newName;
        return newShoppingListInfo;
      });
    }

    function handleChangeParticipants(newParticipantsList) {
      setShoppingListInfo((prevShoppingListInfo) => {
        let newShoppingListInfo = { ...prevShoppingListInfo };
        newShoppingListInfo.participantNameList = newParticipantsList;
        return newShoppingListInfo;
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Detail);
    const { data } = props;
    const [items, setItems] = useState(data.items);
    const initialShoppingListInfo = {
      ...data,
      items: undefined,
    };
    const [shoppingListInfo, setShoppingListInfo] = useState(initialShoppingListInfo);

    return currentNestingLevel ? (
      <div {...attrs}>
        <Uu5Elements.Block
          header={
            <Uu5Forms.Text.Input
              value={shoppingListInfo.name}
              readOnly={shoppingListInfo.ownerName !== identity.name}
              onChange={(event) => handleUpdateName(event.data.value)}
              significance="subdued"
              size="xl"
            />
          }
          card="full"
          headerType="heading"
          level={5}
          headerSeparator={true}
          actionList={[
            {
              icon: "uugds-plus",
              children: <Lsi lsi={{ cs: "Vytvořit", en: "Create" }} />,
              primary: true,
              onClick: handleAddItem,
            },
          ]}
        >
          <Uu5Forms.TextSelect
            label="Participants"
            itemList={shoppingListInfo.participantNameList.map((participant) => ({ value: participant }))}
            value={shoppingListInfo.participantNameList}
            multiple={true}
            insertable={true}
            readOnly={shoppingListInfo.ownerName !== identity.name}
            onChange={(e) => handleChangeParticipants(e.data.value)}
          />
          <Uu5Tiles.ControllerProvider data={items} filterDefinitionList={FILTER_DEFINITION_LIST}>
            <Uu5TilesControls.FilterBar initialExpanded />
            <Uu5TilesControls.SorterBar initialExpanded />
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
                          onClick: () => handleDeleteItem(data.id),
                        },
                      ]}
                    >
                      <Uu5Elements.Grid flow="column" alignItems="center">
                        <Uu5Forms.Checkbox.Input
                          value={data.solved}
                          icon={data.solved ? "uugds-check" : undefined}
                          onClick={() => handleUpdateItem(data.id, "solved", !data.solved)}
                        />
                        <Uu5Forms.Text.Input
                          value={data.name}
                          onChange={(event) => handleUpdateItem(data.id, "name", event.data.value)}
                          significance="subdued"
                        />
                        <Uu5Elements.Text>{`Created by: ${data.authorName}`}</Uu5Elements.Text>
                      </Uu5Elements.Grid>
                    </Uu5Elements.ListItem>
                  </>
                );
              }}
            </Uu5TilesElements.Grid>
          </Uu5Tiles.ControllerProvider>
        </Uu5Elements.Block>
        <Content nestingLevel={currentNestingLevel}>{children}</Content>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
