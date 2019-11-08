import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, Popconfirm,message, Select } from 'antd';
import reactCSS from 'reactcss';
import 'react-dropdown/style.css'
import axios from 'axios';

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);
const { Option } = Select;

const hexRgb = require('hex-rgb');
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

 class StatusConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectPriority: [],
    def: [],
  };

  constructor(props) {
    super(props);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeStatusName = this.onChangeStatusName.bind(this);
    this.handleOk = this.handleOk.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefectStatus = this.deleteDefectStatus.bind(this);

    this.state = {
      projectname: '',
      statusname: '',
      id: '',
      formerrors: {
        projectname: "",
        statusname: ""
        
      },
    }
  };
  handlechange = (e) => {
    e.preventDefault();

    const { projectname, statusname } = e.target;
    let formerrors = { ...this.state.formerrors };

    switch (projectname) {
      case "projectname":
        if (!ValidRegex.test(projectname)) {
          formerrors.projectname = "Invalid Name";
        } else if (projectname.length > 30) {
          formerrors.projectname = "Should be less than 8 characters";
        } else {
          formerrors.projectname = "";
        }
        break;
      case "statusname":
        if (!NameRegex.test(statusname)) {
          formerrors.statusname = "Invalid value";
        }
        if (statusname.length > 10) {
          formerrors.statusname = "Should be less than 70 characters";
        } else {
          formerrors.statusname = "";
        }
        break;

      default:
        break;
    }
    this.setState({ formerrors, [projectname]: statusname }, () => console.log(this.state));
  };

  componentDidMount() {
    //this.componentWillMount()
    this.getDefectStatus()
    this.fetchProjects();
  }

  fetchProjects() {
    var _this = this;
    axios.get('http://localhost:8081/defectservices/GetAllproject')
      .then(function (response) {
        // handle success
        console.log(response.data);
        let x=response.data.map((item, index) => {
          return <Option key={index} value={item.projectId}> {item.projectName}</Option>
        })
        _this.setState({ x });

      });
  }

  onChange = e => {
    [e.target.id] = e.target.value
  };

  onChangeStatusName(e) {
    this.setState({
      statusname: e.target.value
    })
  };


  getDefectStatus() {
    const url = 'http://localhost:8081/defectservices/statusConfigs';
    axios.get(url)
      .then(response => {
        console.log(response.data)
        
        
        this.setState({
        DefectPriority: response.data,
      })})
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteDefectStatus(id) {
    console.log(id)
    fetch(`http://localhost:8081/defectservices/statusConfig/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectStatus = this.state.DefectStatus.filter(DefectStatus => {
      return DefectStatus.id !== id;
    });
    this.setState({
      DefectStatus
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showEditModal = () => {
    console.log("showEditModal clicked");
    this.setState({
      visibleEditModal: true,
    });
  };

  editDefectStatus = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);
    axios.get("http://localhost:8081/defectservices/statusConfig/" + id)
      .then(response => {
        let colorRGBValue = hexRgb(response.data.color);
        //alert(colorRGBValue.red, colorRGBValue.green, colorRGBValue.blue);
        let colorRGB = {
          r: colorRGBValue.red,
          g: colorRGBValue.green,
          b: colorRGBValue.blue,
          a: colorRGBValue.alpha
        };
        this.setState({
          projectname: response.data.projectname,
          statusname: response.data.statusname
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  handleOk = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        message.success("Successfully Added!!!");
        this.setState({ visible: false });
      } else {
      }
    });
    if (formValid(this.state)) {
      console.info(`
        --SUBMITTING--
         Project Name: ${this.state.projectname}
         Status value:${this.state.statusname}
 `);

 this.getDefectStatus();
    //  let colorStringValue = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
     const obj = {
      projectname: this.state.projectname,
      statusname: this.state.statusname
     }

      console.log(obj);
      axios.post('http://localhost:8081/defectservices/statusConfig', obj)
      .then(res => this.getDefectStatus());
          console.log(obj);
          this.setState({
            projectname: '',
            statusname: '',
            visible: false
        
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleEditOk = (id) => {
    // let colorString = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      id:this.state.id,
      projectname: this.state.projectname,
      statusname: this.state.statusname,
    }
    axios.put("http://localhost:8081/defectservices/statusConfig/"+id, obj)
      .then(res => this.getDefectPriority());
    this.setState({
      projectname: '',
      statusname: '',
      visibleEditModal: false
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditStatusCancel = e => {
    console.log(e);
    this.setState({
      visibleEditModal: false,
    });
  };


  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formerrors } = this.state;

    const columns = [
      {
        title: 'Status Id',
        dataIndex: 'statusId',
        key: 'statusId',

      },
      {
        title: 'ProjectId',
        dataIndex: 'projectId',
        key: 'projectname',

      },
      {
        title: 'Status List',
        dataIndex: 'statusList',
        key: 'statusList',
      },
   
      {
        title: 'Action',
        key: 'action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editStatus" onClick={this.editDefectStatus.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmStatus"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }} />}
              onConfirm={this.deleteDefectStatus.bind(this, data.id)}
            >
              <Icon id="deleteStatus" type="delete" style={{ fontSize: '17px', color: 'red' }} />
            </Popconfirm>


          </span>
        ),
      },
    ];

    const styles = reactCSS({
      'default': {
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <React.Fragment>
        <div
          style={{
            padding: 24,
            background: '#fff',
            minHeight: '500px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
          }}>


          <Row>
            <Col span={8}><h3>Status Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div><Button id="addStatus" type="primary" onClick={this.showModal}>
            Add Status
        </Button></div>

          <br></br>
          <Modal
            title=" Add Status"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>

              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
              <Form.Item label="Project Name">
                  <div>
                  <Select id="projects" defaultValue="Project" style={{ width: 200}} onChange={this.handleChange}>
              {this.state.x}
          </Select>
                  </div>
                  {formerrors.projectname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.projectname}
                    </span>
                  )}
                </Form.Item>
                <Form.Item label="Name">
                  <div>
                    {getFieldDecorator("statusname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Status Name!"
                        }
                      ]
                    })(
                      <Row>
                        <Col span={23}>
                      <Input
                        id="statusname"
                        className={
                          formerrors.statusname.length > 0 ? "error" : null
                        }
                        placeholder="StatusName "
                        name="StatusName"
                        value={this.state.statusname}
                        onChange={this.onChangeStatusName} 
                      />
                      </Col>
                      <Col span={1}>
                      <Icon type="plus-circle" />
                      </Col>
                      </Row>
                    )}
                  </div>
                  {formerrors.statusname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.statusname}
                    </span>
                  )}
                  
                </Form.Item>
              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit Status"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.id)}
            onCancel={this.handleEditPriorityCancel}
            style={{ padding: "60px", }}
          >
            <div
              style={{
                margin: "0 -20px 0 0",
                background: '#fff',
                minHeight: '150px',

              }}>
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Project Name">
                  <Input
                    id="projectname"
                    type="text"
                    className="form-control"
                    value={this.state.projectname}
                    onChange={this.onChangeProjectName}
                  />
                </Form.Item>
                <Form.Item label="Status Name">
                  <Input
                    id="statusname"
                    type="text"
                    className="form-control"
                    value={this.state.statusname}
                    onChange={this.onChangeStatusName}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table columns={columns} dataSource={this.state.DefectStatus} style={{ textAlign: "center", alignContent: "center", alignItems: "center", pagination: "disabled" }} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
export default Form.create()(StatusConfig);

