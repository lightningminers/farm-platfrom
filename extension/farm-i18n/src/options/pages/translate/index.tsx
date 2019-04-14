import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "./style.css";
import SingletonData, { IData } from "@/shared/SingletonData";
import { Input, Form, Select } from "antd";
import { FormComponentProps } from "antd/lib/form"
import { extractText, exportFile } from "@/shared/utils";
import localizes from "@/shared/localizes";
import WriteFile from "./components/writeFile";
import * as local from "../../local";

interface IParams {
  id: string;
}

interface IProps extends RouteComponentProps<IParams>, FormComponentProps {};
interface IState {
  data: IData | undefined;
  translateResult: string;
  localize: string;
  visible: boolean;
}

const { TextArea } = Input;
const Option = Select.Option;
const singletonData = SingletonData.sharedInstance();

class Translate extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      data: undefined,
      translateResult: "",
      localize: "en",
      visible: false,
    }
  }

  public componentDidMount(){
    const { match } = this.props;
    const { id } = match.params;
    const data = singletonData.getData(id);
    if (data) {
      this.setState({
        data,
      });
    }
  }

  public createTranslateResult = (e: React.MouseEvent<HTMLDivElement>) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { localize } = values;
        const { data, translateResult } = this.state;
        if (!translateResult) {
          alert(`${local.OPTIONS_TRANSLATE_RESULT_IS_EMPTY}`);
          return;
        }
        if (data) {
          let cur = true;
          let resultJSON: any = {};
          const localizesResult = Object.create(null);
          const tResult = translateResult.split("\n");
          if (data.localizesResult) {
            resultJSON = JSON.parse(data.localizesResult);
          } else {
            resultJSON = JSON.parse(data.result);
            cur = false;
          }
          const keys = Object.keys(resultJSON);
          let i = 0;
          for (const iterator of keys) {
            let l;
            if (cur) {
              l = localizesResult[iterator] = resultJSON[iterator];
            } else {
              l = localizesResult[iterator] = Object.create(null);
              l[data.origin] = {
                "message": resultJSON[iterator][data.origin]["message"]
              }
            }
            const t = tResult[i];
            if (t === "[icepy]") {
              i = i + 1;
              l[localize] = {
                "message": ""
              };
              continue;
            }
            l[localize] = {
              "message": t
            }
            i = i + 1;
          }
          const { localizes } = data;
          if (!(localizes.indexOf(localize) > -1)) {
            data.localizes.push(localize);
          }
          data.localizesResult = JSON.stringify(localizesResult, null, 2);
          singletonData.setData(data.id, data);
          singletonData.saveStorage();
          this.setState({
            data,
            localize
          });
        }
      }
    });
  }


  public onOK = (name: string) => {
    const { data } = this.state;
    if (data) {
      const { localizesResult } = data;
      exportFile(localizesResult, "application/json", name);
      this.setState({
        visible: false,
      });
    }
  }

  public onCancel = () => {
    this.setState({
      visible: false,
    });
  }

  public exportResult = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      visible: true
    });
  }

  public onTextAreaTranslateResult = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    this.setState({
      translateResult: value,
    });
  }

  public renderTranslateI18n = () => {
    const { data, localize } = this.state;
    return (
      <>
        <h5>{local.OPTIONS_I18N_OUTPUT_RESULT}{ data ? localize : "en"}</h5>
        <TextArea
          className={styles["textrea-container"]}
          placeholder=""
          autosize={{ minRows: 2, maxRows: 22 }}
          value={ data ? data.localizesResult : ""}
        />
      </>
    );
  }

  public renderWaitTranslateI18nText = () => {
    const { data, translateResult } = this.state;
    const text = extractText(data);
    return (
      <>
        <h5>{local.OPTIONS_TRANSLATE_ORIGIN}{ data ? data.origin : ""}</h5>
        <TextArea
          className={styles["textrea-container"]}
          placeholder=""
          autosize={{ minRows: 2, maxRows: 8 }}
          value={ data ? data.result : ""}
        />
        <h5 className={styles["translate-result"]}>{local.OPTIONS_WAIT_TRANSLATE_RESULT}</h5>
        <TextArea
          className={styles["textrea-container"]}
          placeholder=""
          autosize={{ minRows: 2, maxRows: 8 }}
          value={ text }
        />
        <h5 className={styles["translate-result"]}>{local.OPTIONS_TRANSLATE_RESULT} </h5>
        <TextArea
          className={styles["textrea-container"]}
          placeholder=""
          autosize={{ minRows: 2, maxRows: 8 }}
          value={ translateResult }
          onChange={this.onTextAreaTranslateResult}
        />
      </>
    )
  }

  public render(){
    const { data, visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles["translate"]}>
        <Form className={styles["form-container"]}>
          <Form.Item className={styles["form-select-container"]}>
            {
              getFieldDecorator("localize", {
                initialValue: "en"
              })(
                <Select>
                  {
                    localizes.map((v) => {
                      return (
                        <Option key={v} value={v}>{v}</Option>
                      )
                    })
                  }
                </Select>
              )
            }
          </Form.Item>
          <div
            className={styles["create-translate-result"]}
            onClick={this.createTranslateResult}
          >
            {local.OPTIONS_OUTPUT_TEXT}
          </div>
          <div
            className={styles["create-translate-result"]}
            onClick={this.exportResult}
          >
            {local.OPTIONS_EXPORT_TEXT}
          </div>
        </Form>
        <div className={styles["translate-container"]}>
          <div className={styles["translate-i18n-data"]}>
            {
              this.renderTranslateI18n()
            }
          </div>
          <div className={styles["wait-translate-i18n-text"]}>
            {
              this.renderWaitTranslateI18nText()
            }
          </div>
        </div>
        <WriteFile
          visible={visible}
          tag={data? data.tag : ""}
          handleOk={this.onOK}
          handleCancel={this.onCancel}
        />
      </div>
    )
  }
}

export default Form.create({name: "translate"})(Translate);
