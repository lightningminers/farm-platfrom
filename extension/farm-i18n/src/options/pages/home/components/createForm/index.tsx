import * as React from "react";
import { Form, Select, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import localizes from "@/shared/localizes";
import * as local from "@/options/local";



const Option = Select.Option;
interface IProps extends FormComponentProps {
  visible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

class CreateI18nForm extends React.Component<IProps> {
  constructor(props: IProps){
    super(props);
  }

  public handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.handleOk();
      }
    });
  }

  public handleCancel = () => {
    this.props.handleCancel();
  }

  public render(){
    const { visible } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={local.OPTIONS_CREATE_I18N_TASK}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Form.Item
            label="选择翻译源"
          >
            {
              getFieldDecorator("origin", {
                initialValue: "zh_CN"
              })(
                <Select>
                  {
                    localizes.map((v) => {
                      return <Option key={v} value={v}>{v}</Option>
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedCreateI18nForm = Form.create<IProps>({name: "createi18n"})(CreateI18nForm);

export default WrappedCreateI18nForm;
