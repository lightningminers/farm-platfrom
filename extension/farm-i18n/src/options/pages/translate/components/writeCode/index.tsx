import * as React from "react";
import { Modal, Form, Tag, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { tagColors } from "@/shared/colors";
import * as local from "@/options/local";

interface IProps extends FormComponentProps {
  tag: string;
  visible: boolean;
  result: string;
  handleOk: (name: string) => void;
  handleCancel: () => void;
}


const Option = Select.Option;
const language = [
  "TypeScript",
  "JavaScript"
];

interface ILanguageMap {
  [key: string]: number;
}

const languageMap: ILanguageMap = {
  "chrome": 0
}

const chromeCodeTypeScriptTemplate = `
const getMessage = (key: string): string => {
  return chrome.i18n.getMessage(key);
}\n
`

const chromeCodeJavaScriptTemplate = `
const getMessage = (key) => {
  return chrome.i18n.getMessage(key);
}\n
`

const createCode = (result: string, tag: string, name: string): string => {
  let r = "";
  const json = JSON.parse(result);
  if (tag === "chrome") {
    const keys = Object.keys(json);
    for (const iterator of keys) {
      r += `const ${iterator} = getMessage("${iterator}");\n`;
    }
    if (name === "TypeScript") {
      return `${chromeCodeTypeScriptTemplate}${r}`;
    }
    if (name === "JavaScript") {
      return `${chromeCodeJavaScriptTemplate}${r}`;
    }
  }
  return ""
}

const WriteCode = (props: IProps) => {
  const { visible, form, tag, result } = props;
  const cur = languageMap[tag];
  const { getFieldDecorator } = form;
  const onOK = () => {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const code = createCode(result, tag, values.name);
        props.handleOk(code);
      }
    });
  }
  const onCancanl = () => {
    props.handleCancel();
  }
  return (
    <Modal
      title={local.OPTIONS_EXPORT_CODE_TEXT}
      visible={visible}
      onOk={onOK}
      onCancel={onCancanl}
      okText={local.OPTIONS_DOWNLOAD_TEXT}
    >
     <Form>
       <Form.Item
        label={local.OPTIONS_DOWNLOAD_EXPORT_LANGUAGEI}
       >
        {
          getFieldDecorator("name", {
            initialValue: language[cur]
          })(
            <Select>
              {
                language.map((v) => {
                  return (
                    <Option key={v} value={v}>{v}</Option>
                  )
                })
              }
            </Select>
          )
        }
       </Form.Item>
       <div>
          <span>
            <Tag color={tagColors[tag] || "geekblue"} key={tag}>{tag.toUpperCase()}</Tag>
          </span>
       </div>
     </Form>
    </Modal>
  )
}

export default Form.create({name: "writeCode"})(WriteCode);
