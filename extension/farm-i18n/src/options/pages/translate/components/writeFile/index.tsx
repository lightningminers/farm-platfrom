import * as React from "react";
import styles from "./style.css";
import { Modal, Form, Tag, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { tagColors } from "@/shared/colors";

interface IProps extends FormComponentProps {
  tag: string;
  visible: boolean;
  handleOk: (name: string) => void;
  handleCancel: () => void;
}

const WriteFile = (props: IProps) => {
  const { visible, form, tag } = props;
  const { getFieldDecorator } = form;
  const onOK = () => {
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.handleOk(values.name);
      }
    });
  }
  const onCancanl = () => {
    props.handleCancel();
  }
  return (
    <Modal
      title={"导出文件"}
      visible={visible}
      onOk={onOK}
      onCancel={onCancanl}
      okText={"下载"}
    >
     <Form>
       <Form.Item
        label="下载名称"
       >
        {
          getFieldDecorator("name", {
            initialValue: "i18n.json"
          })(
            <Input />
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

export default Form.create({name: "writeFile"})(WriteFile);
