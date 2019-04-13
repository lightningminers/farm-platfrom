import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import SingletonData, { IData } from "@/shared/SingletonData";

interface IParams {
  id: string;
}

interface IProps extends RouteComponentProps<IParams> {};
interface IState {
  data: IData | undefined;
}

const singletonData = SingletonData.sharedInstance();

class Translate extends React.Component<IProps, IState> {
  constructor(props: IProps){
    super(props);
    this.state = {
      data: undefined,
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

  public render(){

    return (
      <div>1234</div>
    )
  }
}

export default Translate;
