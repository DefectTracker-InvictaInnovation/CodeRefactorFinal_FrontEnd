import {
  Table,
  Modal,
  Form,
  Input,
  Icon,
  Popconfirm,
  message,
  Button,
  Popover,
  Select,

} from "antd";

import { Component } from "react";
import React from "react";
import axios from "axios";

const { Option } = Select;

class Modulesubmodule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      module: [],
      moduleId: "",
      moduleName: "",
      projectid: "",
      projectId: "",
      subModuleId: "",
      subModuleName: "",
      visible: false,
      formLayout: "horizontal",
      data: [],
      data1: [],
      project: [],
      ModuleData: [],
      SubmoduleData: [],
      key: '',
      date: '',
      name: '',
      sub: [],
      modules: [],
      submodules: [],
      allModules: [],
      projectId1:''
      // data6:[]

    };

    this.state = { ModuleData: [] };
    this.onChangemoduleId = this.onChangemoduleId.bind(this);
    this.onChangemoduleName = this.onChangemoduleName.bind(this);
    this.onChangeprojectid = this.onChangeprojectid.bind(this);
    this.onChangesubModuleId = this.onChangesubModuleId.bind(this);
    this.onChangesubModuleName = this.onChangesubModuleName.bind(this);
    this.onChangeprojectId = this.onChangeprojectId.bind(this);

    this.handleOk3 = this.handleOk3.bind(this);
    this.fetchProject = this.fetchProject.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.OnhandleDelete = this.OnhandleDelete.bind(this);
    this.onChangemodule = this.onChangemodule.bind(this);
    this.getAllModules = this.getAllModules.bind(this);
    this.handleOk1 = this.handleOk1.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleOk2 = this.handleOk2.bind(this);
    this.handleOk4 = this.handleOk4.bind(this);
    this.handleSubmoduleEdit = this.handleSubmoduleEdit.bind(this);
    this.getAllSubModules = this.getAllSubModules.bind(this);
    this.fetchModules = this.fetchModules.bind(this);
  }


  componentDidMount() {
    console.log("kkkkkkkkk")
    this.fetchProject();
    this.getAllModules();
    this.getAllSubModules();
    this.fetchModules();

    this.getallsub();
    this.GetAllmodule();
  }

  fetchProject() {
    var _this = this;
    axios
      .get("http://localhost:8081/defectservices/GetAllproject")
      .then(response => {
        // handle success
        console.log(response);
        //alert(response.data[0].projectId)
        _this.setState({ project: response.data });

        let drop = response.data.map((post, index) => {

          return (
            <Option key={index} value={post.projectId}>
              {post.projectName}
            </Option>
          );
        })

        this.setState({ drop });
        // alert(_this.state.project[0].projectId);
      });
  }

  //DELETE-METHOD 1 = WORKING
  handleDelete = moduleId => {
    axios.delete(`http://localhost:8081/defectservices/deleteModuleById/` + moduleId)
      .then(console.log(moduleId))
      .catch(err => console.log(err));

    const module = this.state.module.filter(module => {
      return module.moduleId !== moduleId;
    });
    this.setState({
      module
    });
  };

  fetchModules() {
    var _this = this;
    axios
      .get("http://localhost:8081/defectservices/GetAllmodule")
      .then(response => {
        // handle success
        console.log(response);
        _this.setState({ allModules: response.data });

        let drop = response.data.map((post, index) => {

          return (
            <Option key={index} value={post.moduleId} placeholder="Select Module">
              {post.moduleName}
            </Option>
          );
        })

        this.setState({ drop });
        // console.log(_this.state.allModules);
      });
  }

  async getAllModules() {
    const url = "http://localhost:8081/defectservices/GetAllmodule";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      modules: data
    });
    console.log(this.state.modules);
  }

  async getAllSubModules() {
    const url = "http://localhost:8081/defectservices/GetAllsubmodule";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      submodules: data
    });
    console.log(this.state.submodules);
  }


  handleCancel = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  handleEdit = moduleId => {
    this.showModal();
    console.log(moduleId);
    this.setState({
      moduleId: moduleId
    });
    axios
      .get("http://localhost:8081/defectservices/GetmoduleById/" + moduleId)
      .then(response => {
        console.log(response.data);
        this.setState({
          moduleId: response.data.moduleId,
          moduleName: response.data.moduleName,
          projectId1: response.data.projectid
        });
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  onChangeprojectId(value) {
    this.setState({
      projectId: `${value}`
    });
    console.log(this.state.projectId);
  }

  onChangemodule(value) {
    this.setState({
      moduleId: `${value}`
    });
    console.log(this.state.moduleId);
  }

  onChangemoduleName(e) {
    this.setState({
      moduleName: e.target.value
    });
  }

  onChangemoduleId(e) {
    this.setState({
      moduleId: e.target.value
    });
  }
  onChangeprojectid(e) {
    this.setState({
      projectId: e.target.value
    });
    console.log(this.state.projectId);
  }

  onChangesubModuleId(e) {
    this.setState({
      subModuleId: e.target.value
    });
    console.log(this.state.subModuleId);
  }

  onChangesubModuleName(e) {
    this.setState({
      subModuleName: e.target.value
    });
    console.log(this.state.subModuleName);
  }

  handleChange3 = (e) => {
    this.setState({ projectid: e.target.value });
  }

  hide = () => {
    this.setState({
      hovered: false
    });
  };

  handleHoverChange = visible => {
    this.setState({
      hovered: visible
    });

    console.log("gghghfghf")
  };

  handleClickChange = visible => {
    this.setState({
      hovered: false
    });
  };
  // constructor() {
  //     super();
  //
  //   }

  confirm = () => {
    message.info("Clicked on Yes.");
  };

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal4 = () => {
    this.setState({
      visible4: true
    });
  };
  handleOk4 = (subModuleId) => {
    console.log(subModuleId);
    const obj = {
      subModuleId: this.state.subModuleId,
      subModuleName: this.state.subModuleName,
      moduleId: this.state.moduleId
    };
    axios
      .put("http://localhost:8081/defectservices/updateSubModule/" + subModuleId, obj)
      .then(response => this.getAllSubModules());
    this.setState({
      subModuleId: "",
      subModuleName: "",
      moduleId: "",
      visible4: false
    });

    message.success("Updated Successfully!!!");
  }
  handleCancel4 = e => {
    console.log(e);
    this.setState({
      visible4: false
    });
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  }
  // };

  // handleCancel = e => {
  //   console.log(e);
  //   this.setState({
  //     visible: false
  //   });
  // };

  handleSubmoduleEdit = subModuleId => {
    this.showModal4();
    console.log(subModuleId);
    this.setState({
      subModuleId: subModuleId
    });
    axios
      .get("http://localhost:8081/defectservices/getSubModuleById/" + subModuleId)
      .then(response => {
        console.log(response);
        this.setState({
          subModuleId: response.data.subModuleId,
          subModuleName: response.data.subModuleName,
          moduleId: response.data.moduleId
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };

  handleOk1 = (e, moduleId) => {
    console.log(e);
    // this.setState({
    //   visible1: false
    // });
    console.log(moduleId);
    const obj = {
      moduleId: this.state.moduleId,
      moduleName: this.state.moduleName,
      projectId: this.state.projectId
    };
    axios
      .put("http://localhost:8081/defectservices/updateModule/" + moduleId, obj)
      .then(response => this.getAllModules());
    this.setState({
      moduleId: "",
      moduleName: "",
      projectId: "",
      visible: false
    });

    message.success("Updated Successfully!!!");
  };

  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true
    });
    console.log(this.state.allModules);
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false
    });
  };
  handleOk2 = subModuleId => {
    const serverport = {
      subModuleId: this.state.subModuleId,
      subModuleName: this.state.subModuleName,
      moduleId: this.state.moduleId
    };
    console.log(serverport);
    axios.post("http://localhost:8081/defectservices/createSubModule", serverport)

      .then(res => console.log(res.data))
      .catch(error => {
        console.log(error);
      });
    this.setState({
      subModuleId: "",
      subModuleName: "",
      moduleId: "",
      visible2: false
    });
  };

  showModal3 = () => {
    this.fetchProject();
    this.setState({
      visible3: true
    });
  };

  handleCancel3 = e => {
    console.log(e);
    this.setState({
      visible3: false
    });
  };

  handleOk3 = e => {
    e.preventDefault();
    console.log("handle3");
    const ModuleData = {
      moduleId: this.state.moduleId,
      moduleName: this.state.moduleName,
      projectid: this.state.projectId,
      subModuleId: this.state.subModuleId,
      subModuleName: this.state.subModuleName,
    };
    console.log(ModuleData);
    axios
      .post("http://localhost:8081/defectservices/createmodule", ModuleData)
      .then({
        // this.sGetAllmodule();
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({
      moduleId: "",
      moduleName: "",
      projectid: "",
      subModuleId: "",
      subModuleName: "",
      visible3: false
    });
  };

  GetAllmodule = () => {
    var _this = this;
    axios
      .get(`http://localhost:8081/defectservices/FindallMain`)
      .then(res => {
        let ModuleData = res.data;
        // let SubModuleData=res.data;
        console.log(res.data.length);
        console.log(res.data[0].subModule);
        const modulelist = Object.assign([], this.state.data);
        for (let i = 0; i < res.data.length; i++) {
          modulelist[i] = {
            key: i,
            moduleId: res.data[i].moduleId,
            moduleName: res.data[i].moduleName,
            projectid: res.data[i].project.projectId,
            subModule: res.data[i].subModule,


          };

          console.log(i);
          console.log(this.state.data);
        }


        this.setState({
          data: modulelist,
          ModuleData: res.data,

        });


        console.log(this.state.data);

        console.log(this.state.data);
        console.log(this.state.ModuleData)

      })
      .catch(function (error) {
        console.log(error);
      });

  };

  subModuletable = () => {

  }

  getallsub() {


    axios

      .get(`http://localhost:8081/defectservices/FindallMain`)
      .then(res => {

        this.setState({
          data4: res.data
        })

        console.log(this.state.data3)
      })
  }
  deletesub = () => {
    // console.log(id)
  }


  handleDelete = moduleId => {
    console.log(moduleId);
    axios
      .delete(
        `http://localhost:8081/defectservices/deleteModuleById/` + moduleId
      )
      .then(console.log(moduleId))
      .catch(err => console.log(err));

    const data = this.state.data.filter(data => {
      return data.moduleId !== moduleId;
    });
    this.setState({
      data
    });
    message.success("Delete Successfully!");
  };

  OnhandleDelete = subModuleId => {
    console.log(subModuleId);
    axios
      .delete(
        `http://localhost:8081/defectservices/deleteSubModuleById/` + subModuleId
      )
      .then(console.log(subModuleId))
      .catch(err => console.log(err));

    const data = this.state.data.filter(data => {
      return data.subModuleId !== subModuleId;
    });
    this.setState({
      data
    });
    message.success("Delete Successfully!");
  }

  expandedRowRender = (expanded) => {
    console.log(expanded)
    const columns = [
      { title: "Submodule ID", dataIndex: "subModuleId", key: "subModuleId" },
      { title: "Submodule Name", dataIndex: "subModuleName", key: "subModuleName" },
      {
        render: (text, data = this.state.patients) => (
          <Icon
            id="editModule"
            type="edit"
            onClick={this.handleSubmoduleEdit.bind(this, data.subModuleId)}
            style={{ color: "blue" }}
          />
        )
      },
      {
        render: (text, data = this.state.patients) => (
          <Popconfirm
            id="confirmdeleteModule"
            placement="topLeft"
            title="Are you sure delete this Row?"
            okText="Yes"
            cancelText="No"
            //  onConfirm={this.deletesub()}
            onConfirm={this.OnhandleDelete.bind(this, data.subModuleId)}
          >
            <Icon id="deleteModule" type="delete" style={{ color: "red" }} />
          </Popconfirm>
        )
      }
    ];
    let data6 = [];
    // for (var i = 0; i < 3; i++) {

    //    data6 = [
    //     {
    //       key: i,
    //       date: expanded.subModule[i].subModuleId,
    //       name: expanded.subModule[i].subModuleName
    //     }

    //   ]


    // }
    return <Table columns={columns} dataSource={expanded.subModule} pagination={false} />;
    // return <Table columns={columns} dataSource={this.state.data6} pagination={false} />;

  };
  render() {


    const hoverContent = <h5>Add Sub Module</h5>;


    const text = "Are you sure to delete this item?";
    const columns = [
      { title: "Module ID", dataIndex: "moduleId", key: "moduleId" },
      { title: "Module Name", dataIndex: "moduleName", key: "moduleName" },

      {
        render: (text, data = this.state.patients) => (
          <Icon
            type="edit"
            onClick={this.handleEdit.bind(this, data.moduleId)}
            style={{ color: "blue" }}
          />
        )
      },
      {
        render: () => (
          // render: (text, data = this.state.patients) => (
          <Popconfirm
            placement="topLeft"
            title={text}
            okText="Yes"
            cancelText="No"
            onConfirm={this.handleDelete.bind(this, data.moduleId)}
          >
            <Icon type="delete" style={{ color: "red" }} />
          </Popconfirm>
        )
      }
    ];

    const data = [
      {
        key: 2,
        moduleId: "01",
        moduleName: "Login",
        projectId: "LS"
      },
      {
        key: 3,
        moduleId: "02",
        moduleName: "QA Dashboard",
        projectId: "LS"
      }
    ];
    const { formLayout } = this.state;
    const { Option, onBlur, onChange, onSearch, onFocus } = Select;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
        : null;
    const buttonItemLayout =
      formLayout === "horizontal"
        ? {
          wrapperCol: { span: 14, offset: 4 }
        }
        : null;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      }
    };




    return (
      <div>
        <div style={{ paddingBottom: "20px" }}>
          <Button id="addModule" type="primary" onClick={this.showModal3}>
            Add Module
          </Button>&nbsp;&nbsp;
          <Button id="addSubModule" type="primary" onClick={this.showModal2}>
            Add SubModule
          </Button>

        </div>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandedRowRender={expanded => this.expandedRowRender(expanded)}
          dataSource={this.state.data}

          expandRowByClick={value => this.openRow(value)}
        />
        <Modal
          title="Add Submodule"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          okText="Add"
        >
          <Form layout={formLayout}>
            <Form.Item label="Submodule Id:">
              <Input id="subModuleId" placeholder="input placeholder"
                onChange={this.onChangesubModuleId}
              />
            </Form.Item>
            <Form.Item label="Submodule Name:">
              <Input id="subModuleName" placeholder="input placeholder"
                onChange={this.onChangesubModuleName}
              />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Select
                id="moduleId"
                defaultValue="Select Module"
                onChange={(e) => this.onChangemodule(e)} value={this.state.moduleId}
              >
                {this.state.drop}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Module"
          visible={this.state.visible}
          onOk={this.handleOk1.bind(this, this.state.moduleId)}
          onCancel={this.handleCancel1}
          okText="Edit"
        >
          <Form layout={formLayout}>
            <Form.Item label="Module ID">
              <Input id="moduleId" placeholder="input placeholder"
                value={this.state.moduleId}
                onChange={this.onChangemoduleId} />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Input id="moduleName" placeholder="input placeholder"
                value={this.state.moduleName}
                onChange={this.onChangemoduleName} />
            </Form.Item>
            <Form.Item label="Project Name:">
              <Input id="projectId" placeholder="input placeholder"
                value={this.state.projectId1}
                onChange={this.onChangeprojectid} />

            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Sub Module"
          visible={this.state.visible4}
          onOk={this.handleOk4.bind(this, this.state.subModuleId)}
          onCancel={this.handleCancel4}
          okText="Edit"
        >
          <Form layout={formLayout}>
            <Form.Item label="Sub Module ID">
              <Input id="subModuleId" placeholder="input placeholder"
                value={this.state.subModuleId}
                onChange={this.onChangesubModuleId} />
            </Form.Item>
            <Form.Item label="Sub Module Name:">
              <Input id="subModuleName" placeholder="input placeholder"
                value={this.state.subModuleName}
                onChange={this.onChangesubModuleName} />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Input id="moduleId" placeholder="input placeholder"
                value={this.state.moduleId}
                onChange={this.onChangemoduleId}
                disabled />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Add Module"
          visible={this.state.visible3}
          onOk={this.handleOk3}
          onCancel={this.handleCancel3}
          okText="Add"
        >
          <Form layout={formLayout}>
            <Form.Item label="Module ID">
              <Input
                id="moduleId"
                placeholder="input placeholder"
                value={this.state.moduleId}
                onChange={this.onChangemoduleId}
              />
            </Form.Item>
            <Form.Item label="Module Name:">
              <Input
                id="moduleName"
                placeholder="input placeholder"
                value={this.state.moduleName}
                onChange={this.onChangemoduleName}
              />
            </Form.Item>
            <Form.Item label="project Name">
              <Select
                id="projectid"
                showSearch
                style={{ width: 200 }}
                placeholder="Select Project"
                optionFilterProp="children"
                onChange={(e) => this.onChangeprojectId(e)} value={this.state.projectId}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {this.state.drop}
              </Select>

            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default Modulesubmodule;
