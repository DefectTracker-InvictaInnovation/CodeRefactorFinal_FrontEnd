
import React from 'react';
import { Table, Divider, Modal, Button, Icon, Upload, Form, Input, Col, Row, Popconfirm } from 'antd';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import axios from 'axios';
import { ChromePicker } from 'react-color';


const options = [
  {
    value: "arrow-up",
    label: <Icon type={'arrow-up'} />
  },
  {
    value: "swap",
    label: <Icon type={'swap'} />
  },
  {
    value: "arrow-down",
    label: <Icon type={'arrow-down'} />
  }
];
const defaultOption = "Select an Icon";

const rgbHex = require('rgb-hex');
const hexRgb = require('hex-rgb');

// const props = {
//   action: '//jsonplaceholder.typicode.com/posts/',
//   listType: 'picture',
//   previewFile(file) {
//     console.log('Your upload file:', file);
//     // Your process logic. Here we just mock to the same file
//     return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
//       method: 'POST',
//       body: file,
//     })
//       .then(res => res.json())
//       .then(({ thumbnail }) => thumbnail);
//   },
// };

export default class PriorityConfig extends React.Component {
  state = {
    visible: false,
    visibleEditModal: false,
    DefectPriority: [],
    def: [],
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
  };

  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeIcon = this.onChangeIcon.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEditOk = this.handleEditOk.bind(this);
    this.deleteDefectPriority = this.deleteDefectPriority.bind(this);

    this.state = {
      name: '',
      value: '',
      color: '',
      icon: '',
      id: ''
    }
  };

  componentDidMount() {
    //this.componentWillMount()
    this.getDefectPriority()
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  };
  onChangeValue(e) {
    this.setState({
      value: e.target.value
    })
  };
  onChangeIcon = icon => {
    this.setState({
      icon: icon.value
    })
  };


  getDefectPriority() {
    const url = 'http://localhost:8083/productservice/defectpriorities';
    axios.get(url)
      .then(response => this.setState({
        DefectPriority: response.data,
      }))
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteDefectPriority(id) {
    console.log(id)
    fetch(`http://localhost:8083/productservice/defectpriority/` + id, {
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
    axios.get("http://localhost:8083/productservice/defectpriority/" + id)
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
          name: response.data.name,
          value: response.data.value,
          icon: response.data.icon,
          color: colorRGB
        });
      })
      .catch(function (error) {
        console.log(error);
      })
    this.setState({ visible: false })
  }

  handleOk = e => {
    this.getDefectPriority();
    let colorStringValue = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      name: this.state.name,
      value: this.state.value,
      icon: this.state.icon,
      color: colorStringValue
    }
    axios.post('http://localhost:8083/productservice/defectpriority', obj)
      .then(res => this.getDefectPriority());
    console.log(obj);
    this.setState({
      name: '',
      value: '',
      icon: '',
      color: '',
      visible: false
    })
  };

  handleEditOk = (id) => {
    let colorString = '#' + rgbHex(this.state.color.r, this.state.color.g, this.state.color.b);
    const obj = {
      id:this.state.id,
      name: this.state.name,
      value: this.state.value,
      icon: this.state.icon,
      color: colorString
    }
    axios.put("http://localhost:8083/productservice/defectpriority/"+id, obj)
      .then(res => this.getDefectPriority());
    this.setState({
      name: '',
      value: '',
      icon: '',
      color: '',
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

  // state = {
  //   displayColorPicker: false,
  //   color: {
  //     r: '241',
  //     g: '112',
  //     b: '19',
  //     a: '1',
  //   },
  // };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
    this.handleClose();
  };

  handleSelect(icon) {
    this.setState({ icon: icon.value });
  }

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

    const columns = [
      {
        title: 'Priority Id',
        dataIndex: 'id',
        key: 'id',

      },
      {
        title: 'Priority',
        dataIndex: 'name',
        key: 'name',

      },
      {
        title: 'Description',
        dataIndex: 'value',
        key: 'value',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
        key: 'icon',
        render: (icon) => <Icon type={icon} />,
      },
      {
        title: 'Colour',
        key: 'color',
        dataIndex: 'color',
        render: (colour) => <Icon type="border" style={{ color: colour, background: colour }} />,
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
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
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

              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                  <Input
                    id="priorityName"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="priorityValue"
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue}
                  />
                </Form.Item>
                <Form.Item label="Icon"  >
                  {/* <Upload {...props}>
                    <Button>
                      <Icon type="upload" /> Upload
                    </Button>
                  </Upload> */}
                  <Dropdown
                    id="priorityIcon"
                    options={options}
                    //onClick={this.handleSelect}
                    onChange={this.onChangeIcon}
                    value={this.state.icon}
                    placeholder="Select an option"
                  />
                  {/* <select value={this.state.icon} onChange={this.handleSelect}>
                    <option value="arrow-up"> <Icon type={'arrow-up'} /> </option>
                    <option value="swap"> <Icon type={'swap'} /> </option>
                    <option value="arrow-down"> <Icon type={'arrow-down'} /> </option>
                  </select> */}
                </Form.Item>
                <Form.Item id="colour" label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker id="colour" color={this.state.color} onChange={this.handleChange} />
                  </div> : null}
                  {/* <div>
                    <button onClick={this.handleClick}>Pick Color</button>
                    {this.state.displayColorPicker ? <div style={styles.popover}>
                      <div style={styles.cover} onClick={this.handleClose} />
                      <ChromePicker />
                    </div> : null}
                  </div> */}
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
                <Form.Item label=" Name">
                  <Input
                    id="priorityName"
                    type="text"
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    id="priorityValue"
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.onChangeValue}
                  />
                </Form.Item>
                <Form.Item label="Icon"  >
                  <Dropdown
                    id="priorityIcon"
                    options={options}
                    onChange={this.onChangeIcon}
                    value={this.state.icon}
                    placeholder="Select an option"
                  />
                </Form.Item>

                <Form.Item id="colour" label="Colour">
                  <div style={styles.swatch} onClick={this.handleClick}>
                    <div style={styles.color} />
                  </div>
                  {this.state.displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <SketchPicker id="colour" color={this.state.color} onChange={this.handleChange} />
                  </div> : null}
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
