//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes, useState, Lsi, useSession } from "uu5g05";
import Config from "./config/config.js";
// import Uu5TilesElements from "uu5tilesg02-elements";
import Uu5Elements from "uu5g05-elements";
import Uu5Forms from "uu5g05-forms";
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

const Detail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Detail",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.shape({
      name: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string,
          solved: PropTypes.bool,
        })
      ),
    }).isRequired,
    disabled: PropTypes.bool,
    theme: PropTypes.oneOf(["light", "dark"]),
  },
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
      setItems((prevItemList)=> {
        return prevItemList.map((item)=> {
          if (item.id === id) {
            item[key] = value;
          }
          return item;
        })
      })
    }

    function handleDeleteItem(id) {
      setItems((prevItemList) => {
        return prevItemList.filter((item)=> {
          return item.id !== id
        })
      })
    }

    function handleUpdateName(newName) {
      setShoppingListInfo((prevShoppingListInfo) => {
        let newShoppingListInfo = {...prevShoppingListInfo};
        newShoppingListInfo.name = newName;
        return newShoppingListInfo;
      })
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, Detail);
    const { data } = props;
    const [items, setItems] = useState(data.items);
    const initialShoppingListInfo = { name: data.name, ownerUuIdentity: data.ownerUuIdentity, participantUuIdentityList: data.participantUuIdentityList};
    const [shoppingListInfo, setShoppingListInfo] = useState(initialShoppingListInfo);

    return currentNestingLevel ? (
      <div {...attrs}>

        <Uu5Elements.Block
          header={<Uu5Forms.Text.Input
            value={shoppingListInfo.name}
            onChange={(event) => handleUpdateName(event.data.value)}
            significance="subdued"
            size="xl"
          />}
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
        <Uu5Elements.Grid>
          {items.map((item)=> {
            return (
              <Uu5Elements.ListItem  
              key={item.id}
                actionList = {[
                  {
                    "icon": "mdi-delete",
                    onClick: ()=> handleDeleteItem(item.id)
                  }
                ]}
              >
                <Uu5Elements.Grid flow="column" alignItems="center">
                  <Uu5Forms.Checkbox.Input
                    value={item.solved}
                    icon={item.solved ? "uugds-check" : undefined }
                    onClick={() => handleUpdateItem(item.id, "solved", !item.solved)}
                  />
                  <Uu5Forms.Text.Input
                    value={item.name}
                    onChange={(event) => handleUpdateItem(item.id, "name", event.data.value)}
                    significance="subdued"
                  />
                  <Uu5Elements.Text>{`Created by: ${item.authorName}`}</Uu5Elements.Text>
                </Uu5Elements.Grid>
              </Uu5Elements.ListItem>
            );
          })}
        </Uu5Elements.Grid>
        </Uu5Elements.Block>
        {/* <Content nestingLevel={currentNestingLevel}>{children}</Content> */}
      </div>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Detail };
export default Detail;
//@@viewOff:exports
