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

 class TypeConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectPriority: [],
    def: [],
  };

  constructor(props) {
    super(props);
    this.onChangeProjectName = this.onChangeProjectName.bind(this);
    this.onChangeTypeName = this.onChangeTypeName.bind(this);
    this.handleOk = this.handleOk.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefectType = this.deleteDefectType.bind(this);

    this.state = {
      projectname: '',
      typename: '',
      id: '',
      formerrors: {
        projectname: "",
        typename: ""
        
      },
    }
  };
  handlechange = (e) => {
    e.preventDefault();

    const { projectname, typename } = e.target;
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
      case "typename":
        if (!NameRegex.test(typename)) {
          formerrors.typename = "Invalid value";
        }
        if (typename.length > 10) {
          formerrors.typename = "Should be less than 70 characters";
        } else {
          formerrors.typename = "";
        }
        break;

      default:
        break;
    }
    this.setState({ formerrors, [projectname]: typename }, () => console.log(this.state));
  };

  componentDidMount() {
    //this.componentWillMount()
    this.getDefectType()
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

  onChangeTypeName(e) {
    this.setState({
      typename: e.target.value
    })
  };


  getDefectType() {
    const url = 'http://localhost:8081/defectservices/typeConfigs';
    axios.get(url)
      .then(response => {
        console.log(response.data)
        
        
        this.setState({
        DefectType: response.data,
      })})
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteDefectType(id) {
    console.log(id)
    fetch(`http://localhost:8081/defectservices/typeConfig/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    console.log(id);
    const DefectType = this.state.DefectType.filter(DefectType => {
      return DefectType.id !== id;
    });
    this.setState({
      DefectType
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

  editDefectType = (id) => {
    this.showEditModal();
    this.setState({ id: id })
    console.log(id);
    axios.get("http://localhost:8081/defectservices/typeConfig/" + id)
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
          typename: response.data.typename
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
         Type value:${this.state.typename}
 `);

 this.getDefectType();
    //  let colorStringValue = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
     const obj = {
      projectname: this.state.projectname,
      typename: this.state.typename
     }

      console.log(obj);
      axios.post('http://localhost:8081/defectservices/typeConfig', obj)
      .then(res => this.getDefectType());
          console.log(obj);
          this.setState({
            projectname: '',
            typename: '',
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
      typename: this.state.typename,
    }
    axios.put("http://localhost:8081/defectservices/typeConfig/"+id, obj)
      .then(res => this.getDefectType());
    this.setState({
      projectname: '',
      typename: '',
      visibleEditModal: false
    })
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleEditTypeCancel = e => {
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
        title: 'Type List',
        dataIndex: 'typeList',
        key: 'typeList',
      },
   
      {
        title: 'Action',
        key: 'action',
        render: (text, data = this.state.def) => (
          <span>

            <Icon id="editType" onClick={this.editDefectType.bind(this, data.id)} type="edit" style={{ fontSize: '17px', color: 'blue' }} />
            <Divider type="vertical" />

            <Popconfirm
              id="deleteConfirmType"
              title="Are you sure, Do you want to delete this ?"
              icon={<Icon type="delete" style={{ color: 'red' }} />}
              onConfirm={this.deleteDefectType.bind(this, data.id)}
            >
              <Icon id="deleteType" type="delete" style={{ fontSize: '17px', color: 'red' }} />
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
            <Col span={8}><h3>Type Configuration</h3></Col>
            <Col span={6}></Col>
            <Col span={10}></Col>
          </Row>
          <br></br>
          <div><Button id="addType" type="primary" onClick={this.showModal}>
            Add Type
        </Button></div>

          <br></br>
          <Modal
            title=" Add Type"
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
                    {getFieldDecorator("typename", {
                      rules: [
                        {
                          required: true,
                          message: "Please input Type Name!"
                        }
                      ]
                    })(
                      <Row>
                        <Col span={23}>
                      <Input
                        id="typename"
                        className={
                          formerrors.typename.length > 0 ? "error" : null
                        }
                        placeholder="typename "
                        name="TypeName"
                        value={this.state.typename}
                        onChange={this.onChangeTypeName}
                        
                      />
                      </Col>
                      <Col span={1}>
                      <Icon type="plus-circle" />
                      </Col>
                      </Row>
                    )}
                  </div>
                  {formerrors.typename.length > 0 && (
                    <span
                      className="error"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {formerrors.typename}
                    </span>
                  )}
                </Form.Item>
              </Form>
            </div>

          </Modal>

          <Modal
            title="Edit Type"
            visible={this.state.visibleEditModal}
            onOk={this.handleEditOk.bind(this, this.state.id)}
            onCancel={this.handleEditTypeCancel}
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
                <Form.Item label="Type Name">
                  <Input
                    id="typename"
                    type="text"
                    className="form-control"
                    value={this.state.typename}
                    onChange={this.onChangeTypeName}
                  />
                </Form.Item>
              </Form>
            </div>

          </Modal>
          <Table columns={columns} dataSource={this.state.DefectType} style={{ textAlign: "center", alignContent: "center", alignItems: "center", pagination: "disabled" }} />

          <Icon type="square" />
        </div>
      </React.Fragment>
    );
  }
}
export default Form.create()(TypeConfig);

