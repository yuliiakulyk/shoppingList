//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import { Modal } from "uu5g05-elements";
import Config from "./config/config.js";
import DeleteForm from "./delete-form";
import CreateForm from "./create-form";
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

const DeleteModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DeleteModal",
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, DeleteModal);

    return currentNestingLevel ? (
      <Modal header={"Delete a shopping list"} onClose={props.onClose} open>
        {(modal) => (
          <DeleteForm
            onSubmit={props.onFormSubmit}
            onCancel={props.onClose}
            style={{ margin: "24px auto", display: "block" }}
          />
        )}
      </Modal>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DeleteModal };
export default DeleteModal;
//@@viewOff:exports
