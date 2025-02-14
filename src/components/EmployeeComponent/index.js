import React from "react";
import { PageHeader, Col } from "antd";
import Employee from "./Employee";
import EmployeeAddModal from "./EmployeeAddModal";
import ImportEmployee from "./ImportEmployee";

class EmployeeComponent extends React.Component {
  /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    const { handleSwitchChange } = this.props;
    const routes = [
      {
        path: "",
        breadcrumbName: "Home"
      },
      // {
      //     path: '',
      //     breadcrumbName: 'Company',
      // },
      {
        path: "second",
        breadcrumbName: "Employee"
      }
    ];
    return (
      <React.Fragment>
        <PageHeader title="Employee" breadcrumb={{ routes }} />
        <div
          style={{
            padding: "0 24px 24px 24px",
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <Col span={4}>
            <EmployeeAddModal />
          </Col>
          <Col span={4}>
            <ImportEmployee />
          </Col>
          <br />
          <br />
          <Employee />
        </div>
      </React.Fragment>
    );
  }
}

export default EmployeeComponent;
