import * as React from "react";
import styles from "./style.css";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { Table, Tag } from "antd";
import createUUID from "usedjs/lib/createUUID";
import * as local from "@/options/local";
import CreateI18nForm from "./components/createForm";
import TEMPLATE from "./template";
import { storageGet, storageSet } from "@/shared/utils";
import SingletonData, { IData } from "@/shared/SingletonData";

const storageKey = "FARM_I18N_STORAGE_KEY";
const singletonData = SingletonData.sharedInstance();

const createI18n = (origin: string, result: string) => {
  const uuid = createUUID();
  return {
    key: uuid,
    id: uuid,
    origin,
    result: result ? result : TEMPLATE,
    tags: ["developer"],
    localizes: [],
    localizesResult: [],
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
        title: "Origin",
        dataIndex: "origin",
        key: "origin",
      },
      {
        title: "Localizes",
        dataIndex: "localizes",
        key: "localizes",
        render: (localizes: string[]) => {
          return (
            <span>{localizes.join(" ")}</span>
          );
        }
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",
        render: (tags: string[]) => (
          <span>
            {

              tags.map((tag: any) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
              })
            }
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (record: IData) => (
          <span>
            <a href="javascript:;" onClick={() => {
              const { data } = this.state;
              const newData = data.filter(v => v.id !== record.id);
              storageSet({ [storageKey]: newData});
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
    storageGet(storageKey).then((v) => {
      const data = v.FARM_I18N_STORAGE_KEY;
      if (data.length > 0) {
        this.setState({
          data
        });
      }
    });
  }

  public render(){
    const { visible, data } = this.state;
    return (
      <div className={styles["home"]}>
        <div className={styles["home-container"]}>
          <button
            className={styles["button"]}
            onClick={() => {
              this.setState({
                visible: true
              });
            }}
          >
            {local.OPTIONS_CREATE_TEXT}
          </button>
        </div>
        <Table columns={this.columns} dataSource={data} />
        <CreateI18nForm
          visible={visible}
          handleOk={(value) => {
            const { origin, result } = value;
            const localize = createI18n(origin, result);
            data.push(localize);
            storageSet({ [storageKey]: data});
            singletonData.parseArray(data);
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
