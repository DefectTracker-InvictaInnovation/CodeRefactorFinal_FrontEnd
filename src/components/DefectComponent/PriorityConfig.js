import React from 'react';
import { Table, Divider, Modal, Button, Icon, Form, Input, Col, Row, Popconfirm,message, Select } from 'antd';
import reactCSS from 'reactcss';
import 'react-dropdown/style.css'
import axios from 'axios';

const NameRegex = RegExp(/^[a-zA-Z]+$/);
const ValidRegex = RegExp(/^[0-9a-zA-Z]+$/);
const { Option } = Select;

const rgbHex = require('rgb-hex');
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



 class PriorityConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectPriority: [],
    def: [],
  };

  constructor(props) {
    super(props);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangePriorityName = this.onChangePriorityName.bind(this);
    this.handleOk = this.handleOk.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefectPriority = this.deleteDefectPriority.bind(this);

    this.state = {
      projectname: '',
      priorityname: '',
      id: '',
      formerrors: {
        projectname: "",
        priorityname: ""
        
      },
    }
  };
  handlechange = (e) => {
    e.preventDefault();

    const { projectname, priorityname } = e.target;
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
      case "priorityname":
        if (!NameRegex.test(priorityname)) {
          formerrors.priorityname = "Invalid value";
        }
        if (priorityname.length > 10) {
          formerrors.priorityname = "Should be less than 70 characters";
        } else {
          formerrors.priorityname = "";
        }
        break;

      default:
        break;
    }
    this.setState({ formerrors, [projectname]: priorityname }, () => console.log(this.state));
  };

  componentDidMount() {
    //this.componentWillMount()
    this.getDefectPriority()
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

  onChangePriorityName(e) {
    this.setState({
      priorityname: e.target.value
    })
  };


  getDefectPriority() {
    const url = 'http://localhost:8081/defectservices/priorityConfigs';
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

  deleteDefectPriority(id) {
    console.log(id)
    fetch(`http://localhost:8081/defectservices/priorityConfig/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectPriority = this.state.DefectPriority.filter(DefectPriority => {
      return DefectPriority.id !== id;
    });
    this.setState({
      DefectPriority
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

  editDefectPriority = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);
    axios.get("http://localhost:8081/defectservices/priorityConfig/" + id)
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
          priorityname: response.data.priorityname
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
         Priority Name: ${this.state.projectname}
         Priority value:${this.state.priorityname}
 `);

 this.getDefectPriority();
    //  let colorStringValue = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
     const obj = {
      projectname: this.state.projectname,
      priorityname: this.state.priorityname
     }

      // console.log(obj);
      // axios.post('http://localhost:8081/defectservices/priorityConfig', obj)
      // .then(res => this.getDefectPriority());
      //     console.log(obj);
      //     this.setState({
      //       projectname: '',
      //       priorityname: '',
      //       visible: false
        
      //   })
        // .catch(error => {
        //   console.log(error);
        // });
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleEditOk = (id) => {
    // let colorString = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      id:this.state.id,
      projectname: this.state.projectname,
      priorityname: this.state.priorityname,
    }
    axios.put("http://localhost:8081/defectservices/priorityConfig/"+id, obj)
      .then(res => this.getDefectPriority());
    this.setState({
      projectname: '',
      priorityname: '',
      visibleEditModal: false
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditPriorityCancel = e => {
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
        title: 'Priority Id',
        dataIndex: 'priorityId',
        key: 'priorityId',

      },
      {
        title: 'ProjectId',
        dataIndex: 'projectId',
        key: 'projectname',

      },
      {
        title: 'PriorityList',
        dataIndex: 'priorityList',
        key: 'priorityList',
      },
   
      {
        title: 'Action',
        key: 'action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editPriority" onClick={this.editDefectPriority.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmPriority"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }} />}
              onConfirm={this.deleteDefectPriority.bind(this, data.id)}
            >
              <Icon id="deletePriority" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Priority Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div><Button id="addPriority" type="primary" onClick={this.showModal}>
            Add priority
        </Button></div>

          <br></br>
          <Modal
            title=" Add Priority"
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
                    
                    {getFieldDecorator("priorityname", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Priority Name!"
                        }
                      ]
                    })(
                      <Row>
                        <Col span={23}>
                      <Input
                        id="priorityname"
                        className={
                          formerrors.priorityname.length > 0 ? "error" : null
                        }
                        placeholder="PriorityName "
                        name="PriorityName"
                        value={this.state.priorityname}
                        onChange={this.onChangePriorityName}
                        
                      /></Col>
                      <Col span={1}>
                      <Icon type="plus-circle" />
                      </Col>
                      </Row>
                    )}
                  </div>
                  {formerrors.priorityname.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.priorityname}
                    </span>
                  )}
                  
                </Form.Item>
              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit priority"
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
                <Form.Item label="Priority Name">
                  <Input
                    id="priorityname"
                    type="text"
                    className="form-control"
                    value={this.state.priorityname}
                    onChange={this.onChangePriorityName}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table columns={columns} dataSource={this.state.DefectPriority} style={{ textAlign: "center", alignContent: "center", alignItems: "center", pagination: "disabled" }} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
export default Form.create()(PriorityConfig);