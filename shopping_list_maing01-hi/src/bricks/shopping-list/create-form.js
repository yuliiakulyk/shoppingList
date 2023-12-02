//@@viewOn:imports
import { createVisualComponent, Utils, PropTypes, Content, useLsi } from "uu5g05";
import Config from "./config/config.js";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
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

const CreateForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "CreateForm",
  nestingLevel: ["areaCollection", "area"],
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    onCancel: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    const { elementProps } = Utils.VisualComponent.splitProps(props);
    const lsi = useLsi(importLsi, [CreateForm.uu5Tag]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, CreateForm);

    return currentNestingLevel ? (
      <Form {...elementProps} onSubmit={props.onSubmit}>
        <FormText name="name" label={lsi.name} required />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", paddingTop: 8 }}>
          <CancelButton onClick={props.onCancel}>{lsi.cancel}</CancelButton>
          <SubmitButton>{lsi.submit}</SubmitButton>
        </div>
      </Form>
    ) : null;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { CreateForm };
export default CreateForm;
//@@viewOff:exports
