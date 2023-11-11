//@@viewOn:imports
import { createVisualComponent, Utils, Content, PropTypes } from "uu5g05";
import { Modal, Box, Line, Text, DateTime } from "uu5g05-elements";
import Config from "./config/config.js";
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

const CreateModal = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateModal",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    jokeDataObject: PropTypes.object.isRequired,
    categoryList: PropTypes.array,
    onClose: PropTypes.func,
    onFormSubmit: PropTypes.func,
    onDelete: PropTypes.func,
  },
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
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CreateModal);

    return currentNestingLevel ? (
      <Modal header={"Create a new shopping list"} onClose={props.onClose} open>
        {(modal) => (
          <CreateForm
            onSubmit={props.onFormSubmit}
            onCancel={props.onClose}
            style={{ margin: "24px ", display: "block" }}
          />
        )}
      </Modal>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateModal };
export default CreateModal;
//@@viewOff:exports
