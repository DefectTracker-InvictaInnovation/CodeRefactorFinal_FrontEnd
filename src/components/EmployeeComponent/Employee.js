import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Form,
  Select,
  Row,
  Col,
  Popconfirm,
  message
} from "antd";
import Highlighter from "react-highlight-words";
import React from "react";
import axios from "axios";
import { API_BASE_URL_EMP } from '../../constants/index';
import Profile from './Profile';
import ProfileScreen from '../SettingComponent/ProfileScreen';
import EmployeeAddModal from "./EmployeeAddModal";
import ImportEmployee from "./ImportEmployee";

const { Option } = Select;

function confirm(e) {
  console.log(e);
  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);
  // message.error('Click on No');
}

function onChange(sorter) {
  console.log("params", sorter);
}

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);

const formValid = ({ formerrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formerrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

 class App extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeFirstName = this.onChangeEmployeeFirstName.bind(this);
    this.onChangeEmployeeEmail = this.onChangeEmployeeEmail.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);

    this.state = {
      employeeautoId: "",
      employeeId: "",
      employeeName: "",
      employeeFirstName: "",
      employeeDesignation: "",
      employeeEmail: "",
      Name:'',
      Email:'',
      Designationname:'',
      visible1:false,
      visiblepro:false,
      formerrors: {
        employeeId: "",
        employeeName: "",
        employeeFirstName: "",
        employeeEmail: ""
      },
      bench:"",
      projectName:"",
      availability:"",
      profilePicPath:''
    };

    this.state = {
      searchText: "",
      employees: [],
      patients: [],
      Total: "",
      des:[]
    };
  }

  onChangeEmployeeId(e) {
    this.setState({
      employeeId: e.target.value
    });
  }
  onChangeEmployeeName(e) {
    this.setState({
      employeeName: e.target.value
    });
  }

  onChangeEmployeeFirstName(e) {
    this.setState({
      employeeFirstName: e.target.value
    });
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation);
  }

  onChangeEmployeeEmail(e) {
    this.setState({
      employeeEmail: e.target.value
    });
  }

  state1 = {
    filteredInfo: null,
    sortedInfo: null
  };

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  componentDidMount() {
    this.fetchDesignations();
    console.log("mounting");
    this.getAllEmployees();
    this.getTotalEmployee();
  }

  fetchDesignations() {
    var _this = this;
    axios
      .get(API_BASE_URL_EMP + "/getAllDesignation")
      .then(function (response) {
        // handle success

        let des= response.data.map(function (item, index) {
          return (
            <Option key={index} value={item.designationid}>
              {item.designationname}
            </Option>
          );
        });
        console.log(response.data);
        _this.setState({ des:des });
      
      });
  }

  handleOk = empId => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!")
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--
        Employee Id: ${this.state.employeeId}
        Employee Name: ${this.state.employeeName}
        Employee FirstName:${this.state.employeeFirstName}
        Employee Email: ${this.state.employeeEmail}  
        Employee Picture: ${this.state.employeePicture}    
      `);
    console.log(empId);
    const obj = {
      empId: this.state.employeeautoId,
      employeeid: this.state.employeeId,
      name: this.state.employeeName,
      firstname: this.state.employeeFirstName,
      designationid: this.state.employeeDesignation,
      email: this.state.employeeEmail
    };
    axios
      .put(API_BASE_URL_EMP +"/update/"+ empId, obj)
      // .then(response => this.getAllEmployees());
    this.setState({
      employeeautoId: "",
      employeeId: "",
      employeeName: "",
      employeeFirstName: "",
      employeeDesignation: "",
      employeeEmail: "",
      visible: false
    });

    message.success("Updated Successfully!!!");
  }else {
    console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  }
};

  handleCancel = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  //fetching the employee with get all employee
  getAllEmployees=()=>{
   
var _this=this;
    const url = API_BASE_URL_EMP + "/getallemployee";
    axios
    .get(url)
    .then(function (response) {
      _this.setState({
        employees:response.data
      });
    });
   
    console.log(_this.state.employees);
  }
  async getTotalEmployee() {
    const url = API_BASE_URL_EMP + "/getcount";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      Total: data
    });
    console.log(this.state.Total);
  }
  handleDelete = empId => {
    fetch(API_BASE_URL_EMP + "/deletebyid/" + empId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    });
    console.log(empId);
    confirm(empId);
    const employees = this.state.employees.filter(employees => {
      return employees.empId !== empId;
    });
    this.setState({
      employees
    });
  };

  handleChange = (pagination, filters, sorter,e) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
    e.preventDefault();

    const { name, value } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (name) {
      case "employeeId":
        if (!ValidRegex.test(value)) {
          formerrors.employeeId = "Invalid Id";
        } else if (value.length > 8) {
          formerrors.employeeId = "Should be less than 8 characters";
        } else if (value.length < 2) {
          formerrors.employeeId = "Should be greater than 2 characters";
        } else {
          formerrors.employeeId = "";
        }
        break;
      case "employeeName":
        if (!NameRegex.test(value)) {
          formerrors.employeeName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeName = "Should be less than 30 characters";
        } else {
          formerrors.employeeName = "";
        }
      case "employeeFirstName":
        if (!NameRegex.test(value)) {
          formerrors.employeeFirstName = "Invalid Name";
        } else if (value.length > 30) {
          formerrors.employeeFirstName = "Should be less than 30 characters";
        } else {
          formerrors.employeeFirstName = "";
        }
        break;
      case "employeeEmail":
        formerrors.employeeEmail = emailRegex.test(value)
          ? ""
          : "Invalid email address";
        break;
      default:
        break;
    }
    this.setState({ formerrors, [name]: value }, () => console.log(this.state));
  };

  handleEdit = empId => {
    this.showModal();
    console.log(empId);
    this.setState({
      empId: empId
    });
    axios
      .get(API_BASE_URL_EMP + "/getempolyeebyid/" + empId)
      .then(response => {
        console.log(response);
        this.setState({
          employeeautoId: response.data.empId,
          employeeId: response.data.employeeid,
          employeeName: response.data.name,
          employeeFirstName: response.data.firstname,
          employeeDesignation: response.data.designationname,
          employeeEmail: response.data.email
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
        <div style={{ padding: 8 }}>
          <Input

            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            id="search"
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
        </Button>
          <Button
            id="reset"
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  statuschange=(id)=>{
console.log(id)
    axios
    .get("http://localhost:8081/defectservices/getemployee/"+id)
    .then(resp => {
      let audit = resp.data[0];
      console.log(audit);
      if(audit){
        this.setState({ Name:audit.firstname,
            Email:audit.email,
            Designationname:audit.designationname,
            visible1:true
         });
        }
    });


  }

  showModalpro = (id) => {
    axios
    .get("http://localhost:8081/defectservices/getemployee/"+id)
    .then(resp => {
      let audit = resp.data[0];
      console.log(resp.data);
      if(audit){
        this.setState({ Name:audit.firstname,
            Email:audit.email,
            Designationname:audit.designationname,
            bench:"70%",
            projectName:audit.projectName,
            availability:audit.availability,
            profilePicPath:audit.profilePicPath,
            visiblepro:true
         });
        }else{
          axios
          .get("http://localhost:8084/employeeservice/getempolyeebyid/"+id)
          .then(resp => {
            let audit = resp.data;
            this.setState({ Name:audit.firstname,
              Email:audit.email,
              Designationname:audit.designationname,
              profilePicPath:audit.profilePicPath,
              visiblepro:true,
              bench:"Bench",
            projectName:"Not allocated",
            availability:"100%",
          })  
    });
  }
  
     });
  };
  handleOkpro = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visiblepro: false,
        confirmLoading: false,
      });
    }, 2000);
  };
  handleCancelpro = () => {
    console.log('Clicked cancel button');
    this.setState({
      visiblepro: false,
    });
  };


  render() {
    // For Table functions
    const { formerrors } = this.state;
    const { getFieldDecorator } = this.props.form;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Emp Id",
        dataIndex: "employeeid",
        key: "employeeid",
        width: "10%",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.employeeid.length - b.employeeid.length
      },
      {
        title: "Employee Name",
        dataIndex: "name",
        key: "name",
        width: "25%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Employee FirstName",
        dataIndex: "firstname",
        key: "firstname",
        width: "25%",
        ...this.getColumnSearchProps("firstname")
      },

      {
        title: "Designation",
        dataIndex: "designationname",
        key: "designationname",
        width: "25%",
        ...this.getColumnSearchProps("designationname")
      },

      {
        title: "Email Id",
        dataIndex: "email",
        key: "email",
        ...this.getColumnSearchProps("email")
      },

      {
        title: "Edit",
        render: (text, data = this.state.patients) => (
          <a>
            <Icon
              id="edit"
              type="edit"
              onClick={this.handleEdit.bind(this, data.empId)}
              style={{ fontSize: "18px", color: "green" }}
            />
          </a>
        ),
        key: "edit",
        width: "7%"
      },
      {
        title: "Delete",
        dataIndex: "empId",
        key: "empId",
        // ...this.getColumnSearchProps("empId"),
        render: (text, data = this.state.patients) => (
          <Popconfirm
            id="employeeDelete"
            title="Warning:Do you want to Delete this Whole Data?"
            // onConfirm={this.handleDelete.bind(this, data.empId)}
            onCancel={cancel}
            okText="OK"
            cancelText="No"
          >
            <a>
              <Icon id="delete" type="delete" style={{ fontSize: "18px", color: "red" }} />
            </a>
          </Popconfirm>
        ),
        key: "delete",
        width: "8%"
      }
    ];
    return (
      <React.Fragment>
        <div>
        <Col span={4}>
            <EmployeeAddModal reload={this.getAllEmployees} />
          </Col>
          <Col span={4}>
            <ImportEmployee  reload={this.getAllEmployees}/>
          </Col>
          <br/>
          <br/>

        <Modal
          title={null}
          visible={this.state.visiblepro}
          onOk={this.handleOkpro}
          // confirmLoading={confirmLoading}
          onCancel={this.handleCancelpro}
          width="600px"
          footer={null}
          headers={null}
        >
       <ProfileScreen 
       Name={this.state.Name} 
       Email={this.state.Email} 
       Designationname={this.state.Designationname}
       bench={this.state.bench}
       projectName={this.state.projectName}
       availability={this.state.availability}
       profilePicPath={this.state.profilePicPath}
       
       />
        </Modal>



          <Modal
            title="Edit Employee"
            visible={this.state.visible}
            onOk={this.handleOk.bind(this, this.state.empId)}
            onCancel={this.handleCancel}
            width="500px"
          >
            <Form>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Id">
                    <Input
                      id="employeeId"
                      placeholder="Employee Id"
                      value={this.state.employeeId}
                      onChange={this.onChangeEmployeeId}
                      disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee Name">
                  <div>
                  {getFieldDecorator("employeeId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input employeeId!"
                        }
                      ]
                    })(
                    <Input
                      id="employeeName"
                      placeholder="Employee Name"
                      value={this.state.employeeName}
                      onChange={this.onChangeEmployeeName}
                      onChange={this.onChange}
                    />
                    )}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Employee FirstName">
                  <div>
                  {getFieldDecorator("employeeId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input employeeId!"
                        }
                      ]
                    })(
                    <Input
                      id="employeeFirstName"
                      placeholder="Employee FirstName"
                      value={this.state.employeeFirstName}
                      onChange={this.onChangeEmployeeFirstName}
                      onChange={this.onChange}
                    />
                    )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={8} style={{ padding: "5px" }}>
                  <Form.Item label="Designation">
                  <div>
                  {getFieldDecorator("employeeId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input employeeId!"
                        }
                      ]
                    })(
                   <Select
                      // defaultValue="Select Designation"
                      id="employeeDesignation"
                      value={this.state.employeeDesignation}
                      onChange={this.onChangeEmployeeDesignation}
                      onChange={this.onChange}
                    >
                      {this.state.des}
                    </Select> 
                    )}
                    </div>
                  </Form.Item>
                </Col>
                
                <Col span={16} style={{ padding: "5px" }}>
                  <Form.Item label="Email Id">
                  <div>
                  {getFieldDecorator("employeeId", {
                      rules: [
                        {
                          required: true,
                          message: "Please input employeeId!"
                        }
                      ]
                    })(
                    <Input
                      id="employeeEmail"
                      placeholder="Email Id"
                      value={this.state.employeeEmail}
                      onChange={this.onChangeEmployeeEmail}
                      onChange={this.onChange}
                    />
                    )}
                    </div>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.employees}
          pagination={{
            total: this.state.Total,
            //  showTotal: total => `Total ${total} employees`
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSize: 10,
            showSizeChanger: true
            // showQuickJumper: true
          }}

          onRow={(record, rowIndex) => {
            return {
              // onClick: () => {this.showModalpro(record.empId)}, // click row
              onDoubleClick: () => {this.showModalpro(record.empId)}, // double click row
              // onContextMenu: event => {}, // right button click row
              //  onMouseEnter: () => {this.showModalpro(record.empId)}, // mouse enter row
              // onMouseLeave: event => {}, // mouse leave row
            };
          }}
        />
      </React.Fragment>
    );
  }
}
export default Form.create()(App);