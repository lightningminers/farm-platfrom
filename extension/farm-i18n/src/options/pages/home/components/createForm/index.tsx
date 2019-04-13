import * as React from "react";
import { Form, Select, Modal } from "antd";
import { FormComponentProps } from "antd/lib/form";
import localizes from "@/shared/localizes";
import * as local from "@/options/local";


const Option = Select.Option;

interface IForm {
  origin: string;
  result: string;
}
interface IProps extends FormComponentProps {
  visible: boolean;
  handleOk: (value: IForm) => void;
  handleCancel: () => void;
}

class CreateI18nForm extends React.Component<IProps> {

  public readFileResult: string;
  public readFileStatus: boolean;

  constructor(props: IProps){
    super(props);
    this.readFileResult = "";
    this.readFileStatus = false;
  }

  public handleOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (this.readFileStatus) {
          values["result"] = this.readFileResult;
        }
        this.props.handleOk(values);
      }
    });
  }

  public handleCancel = () => {
    this.props.handleCancel();
  }

  public handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent) => {
        const target = ev.target as any;
        if (target) {
          const result = target.result;
          this.readFileStatus = true;
          this.readFileResult = result;
        }
      }
      reader.readAsText(file);
    }
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
          <Form.Item
            label="导入（可选）"
          >
            <input
              type="file"
              name="jsonfile"
              accept="application/json"
              onChange={this.handleUpload}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedCreateI18nForm = Form.create<IProps>({name: "createi18n"})(CreateI18nForm);

export default WrappedCreateI18nForm;
