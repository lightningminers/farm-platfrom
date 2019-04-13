import * as React from "react";
import styles from "./style.css";
import { NavLink } from "react-router-dom";
import { Table, Tag, Modal } from 'antd';
import createUUID from "usedjs/lib/createUUID";
import * as local from "@/options/local";
import CreateI18nForm from "./components/createForm";

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text: string) => <NavLink to={`/json/${text}`}>{text}</NavLink>,
  },
  {
    title: 'Origin',
    dataIndex: 'origin',
    key: 'origin',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {

          tags.map((tag: any) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
          })
        }
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (record: IData) => (
      <span>
        <a href="javascript:;">Delete{ console.log(record)}</a>
      </span>
    ),
  }
];


interface IData {
  key: string;
  id: string;
  origin: string;
  tags: string[];
}

const data: IData[] = [
  {
    key: createUUID(),
    id: createUUID(),
    origin: "zh_CN",
    tags: ['developer']
  }
];

const Home = () => {
  const [ visible, setVisible ] = React.useState(false);
  return (
    <div className={styles["home"]}>
      <div className={styles["home-container"]}>
        <button
          className={styles["button"]}
          onClick={() => {
            setVisible(true);
          }}
        >
          {local.OPTIONS_CREATE_TEXT}
        </button>
      </div>
      <Table columns={columns} dataSource={data} />
      <CreateI18nForm
        visible={visible}
        handleOk={() => {
          setVisible(false);
        }}
        handleCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  )
}

export default Home;
