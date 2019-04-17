import * as React from "react";
import styles from "./style.css";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Table, Tag } from "antd";
import createUUID from "usedjs/lib/createUUID";
import * as local from "@/options/local";
import CreateI18nForm from "./components/createForm";
import TEMPLATE from "./template";
import SingletonData, { IData } from "@/shared/SingletonData";
import { tagColors } from "@/shared/colors";

const singletonData = SingletonData.sharedInstance();

const createI18n = (origin: string, result: string, name: string, tag: string) => {
  const uuid = createUUID();
  return {
    key: uuid,
    id: uuid,
    name,
    origin,
    result: result ? result : TEMPLATE,
    tag,
    localizes: [],
    localizesResult: "",
  }
}

interface IProps extends RouteComponentProps<any>{}
interface IState {
  visible: boolean;
  data: IData[];
}

class Home extends React.Component<IProps, IState> {
  public columns: any[];
  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      data: []
    }
    this.columns = [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
        render: (text: string) => <NavLink to={`/translate/${text}`}>{text}</NavLink>,
      },
      {
        title: "名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "翻译源",
        dataIndex: "origin",
        key: "origin",
      },
      {
        title: "本地化",
        dataIndex: "localizes",
        key: "localizes",
        render: (localizes: string[]) => {
          return (
            <span>{localizes.join(" ")}</span>
          );
        }
      },
      {
        title: "Tag",
        key: "tag",
        dataIndex: "tag",
        render: (tag: string) => {
          return (
            <span>
              <Tag color={tagColors[tag] || "geekblue"} key={tag}>{tag.toUpperCase()}</Tag>
            </span>
          )
        },
      },
      {
        title: "可执行",
        key: "action",
        render: (record: IData) => (
          <span>
            <a href="javascript:;" onClick={() => {
              const { data } = this.state;
              const newData = data.filter(v => v.id !== record.id);
              singletonData.removeData(record.id);
              singletonData.saveStorage();
              this.setState({
                data: newData,
              })
            }}>Delete</a>
          </span>
        ),
      }
    ];
  }

  public componentDidMount(){
    const data = singletonData.toArray();
    this.setState({
      data,
    });
  }

  public render(){
    const { visible, data } = this.state;
    return (
      <div className={styles["home"]}>
        <div className={styles["home-container"]}>
          <div
            className={styles["button"]}
            onClick={() => {
              this.setState({
                visible: true
              });
            }}
          >
            {local.OPTIONS_CREATE_TEXT}
          </div>
        </div>
        <Table columns={this.columns} dataSource={data} />
        <CreateI18nForm
          visible={visible}
          handleOk={(value) => {
            const { origin, result, name, tag } = value;
            const localize = createI18n(origin, result, name, tag);
            data.push(localize);
            singletonData.setData(localize.id, localize);
            singletonData.saveStorage();
            this.setState({
              data,
              visible: false
            });
          }}
          handleCancel={() => {
            this.setState({
              visible: false
            });
          }}
        />
      </div>
    )
  }
}

export default Home;
