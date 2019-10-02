import React from "react";
import { Table,Icon,Form, Select, Row,Col,Upload,Input,Modal,Button,TreeSelect,Tag,Comment,Avatar,List,Popconfirm,message, Divider } from "antd";
import moment from "moment";
import axios from "axios";
import EditorIn from "./Editor";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Highlighter from "react-highlight-words";
//import { types } from "@babel/core";

const TreeNode = TreeSelect.TreeNode;
const Option = Select.Option;
const { TextArea } = Input;
const id = 1;
const props = {
 name: "files",
  action:
    "http://localhost:8081/defectservices/uploadMultipleFiles?defectId=" + id,
  headers: {
    authorization: "authorization-text"
  },
  multiple: true
};

function confirm(e) {
  console.log(e);

  message.success("Successfully Deleted");
}

function cancel(e) {
  console.log(e);

  message.error("Click on No");
}
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

class TableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeDefectId = this.onChangeDefectId.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeModuleId = this.onChangeModuleId.bind(this);
    this.onChangeAbbre = this.onChangeAbbre.bind(this);
    this.onChangeProjectId = this.onChangeProjectId.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeDefectDescription = this.onChangeDefectDescription.bind(this);
    this.onChangeStepsToRecreate = this.onChangeStepsToRecreate.bind(this);
    this.onChangeAssignTo = this.onChangeAssignTo.bind(this);
    this.onChangeReassignTo= this.onChangeReassignTo.bind(this);
    this.onChangeEnteredBy = this.onChangeEnteredBy.bind(this);
    this.onChangeFixedBy = this.onChangeFixedBy.bind(this);
    this.onChangeAvailableIn = this.onChangeAvailableIn.bind(this);
    this.onChangeFoundIn = this.onChangeFoundIn.bind(this);
    this.onChangeFixedIn = this.onChangeFixedIn.bind(this);
    this.onChangeDateAndTime = this.onChangeDateAndTime.bind(this);
    this.onChangeEmployeeDesignation = this.onChangeEmployeeDesignation.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.fetchDesignations = this.fetchDesignations.bind(this);
  

    this.state = {
      searchText: "",
      filteredInfo: null,
      sortedInfo: null,
      defect: [],
      moduleId: "",
      defectId: "",
      abbre: "",
      projectId: "",
      //moduleId: "",
      priority: "Medium",
      severity: "Medium",
      type: "",
      status: "",
      defectDescription: "",
      stepsToRecreate: "",
      assignTo: "",
      reassignTo: "",
      enteredBy: "",
      fixedBy: "",
      availableIn: "",
      foundIn: "",
      fixedIn: "",
      dateAndTime: "",
      employeeDesignation: "",
      addAttachment: {
        name: "",
        action: "",
        headers: "",
        multiple: true
      },
      images: [],
      user: "",
     // status: "",
      audit: "",
      comment: [],
      photoIndex: 0,
      isOpen: false,
      count: 0,
      //filteredInfo: null,
     // sortedInfo: null,
      visible: false,
      visible1: false,
      showModalView: false,
      comments: [],
      submitting: false,
      value: "",
      types: [],
      
      
     
     
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.refreshDefect = this.refreshDefect.bind(this);
    //this.handleEditOk = this.handleEditOk.bind(this);
    this.handleOk = this.handleOk.bind(this);
    
    // this.onChange1 = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showModalView = this.showModalView.bind(this);
    this.state = {
      searchText: "",
      employees: [],
      patients: [],
      Total: ""
    };
    
  }

  componentDidMount() {
    //this.fetchTypes();
    console.log("mounting");
    //console.log("mounting");
    this.getAllEmployees();
    this.fetchDesignations();
  }

  onChangeEmployeeDesignation(value) {
    this.setState({
      employeeDesignation: `${value}`
    });
    console.log(this.state.employeeDesignation);
  }
 
  fetchDesignations() {
    var _this = this;
    axios
      .get("http://localhost:8084/employeeservice/getAllDesignation")
      .then(function(response) {
        // handle success
        console.log(response.data);
        _this.setState({ designations: response.data });
        console.log(_this.state.designations);
      });
  }
 
  
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  

  onChangeDefectId(e) {
    this.setState({
      defectId: e.target.value
    });
  }
  onChangeType(e) {
    this.setState({
     type: e.target.value
    });
  }
  onChangeModuleId(e) {
    this.setState({
      moduleId: e.target.value
    });
  }
  onChangeAbbre(e) {
    this.setState({
      abbre: e.target.value
    });
  }
  onChangeProjectId(e) {
    this.setState({
      projectId: e.target.value
    });
  }
  onChangePriority(e) {
    this.setState({
      priority: e.target.value
    });
  }
  onChangeSeverity(e) {
    this.setState({
      severity: e.target.value
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }
  onChangeDefectDescription(e) {
    this.setState({
      defectDescription: e.target.value
    });
  }
  onChangeStepsToRecreate(e) {
    this.setState({
      stepsToRecreate: e.target.value
    });
  }
  onChangeAssignTo(e) {
    this.setState({
      assignTo: e.target.value
    });
  }
  onChangeReassignTo(e) {
    this.setState({
      reassignTo: e.target.value
    });
  }
  onChangeEnteredBy(e) {
    this.setState({
      enteredBy: e.target.value
    });
  }
  onChangeFixedBy(e) {
    this.setState({
      fixedBy: e.target.value
    });
  }
  onChangeAvailableIn(e) {
    this.setState({
      availableIn: e.target.value
    });
  }
  onChangeFoundIn(e) {
    this.setState({
      foundIn: e.target.value
    });
  }
  onChangeFixedIn(e) {
    this.setState({
      fixedIn: e.target.value
    });
  }
  onChangeDateAndTime(e) {
    this.setState({
      dateAndTime: e.target.value
    });
  }

  

  handleOk = defectId => {
    console.log(defectId);
    const obj = {
      //empId: this.state.employeeautoId,
      defectId: this.state.defectId,
      type: this.state.type,
      moduleId: this.state.moduleId,
      abbre: this.state.abbre,
      projectId: this.state.projectId,
      priority: this.state.priority,
      severity: this.state.severity,
      status: this.state.status,
      defectDescription: this.state.defectDescription,
      stepsToRecreate: this.state.stepsToRecreate,
      assignTo: this.state.assignTo,
      reassignTo: this.state.reassignTo,
      enteredBy: this.state.enteredBy,
      fixedBy: this.state.fixedBy,
      availableIn: this.state.availableIn,
      foundIn: this.state.foundIn,
      fixedIn: this.state.fixedIn,
      dateAndTime: this.state.dateAndTime,
     // firstname:this.state.employeeFirstName,
      //designationid: this.state.employeeDesignation,
      //email: this.state.employeeEmail
    };
    axios
      .put("http://localhost:8081/defectservices/updateDefect/" + defectId, obj)
      .then(response => this.getAllEmployees());
    this.setState({
     // employeeautoId: "",
     defectId: "",
     type: "",
     moduleId: "",
     abbre: "",
     projectId: "",
     priority: "",
     severity: "",
     status: "",
     defectDescription: "",
     stepsToRecreate: "",
     assignTo: "",
     reassignTo: "",
     enteredBy: "",
     fixedBy: "",
     availableIn: "",
     foundIn: "",
     fixedIn: "",
     dateAndTime: "",
    
     
      visible: false
    });

    message.success("Updated Successfully!!!");
  };
  handleCancel = e => {
    console.log(e);

    this.setState({
      visible: false
    });
  };

  //fetching the employee with get all employee
  async getAllEmployees() {
    const url = "http://localhost:8081/defectservices/getAllDefects";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({
      employees: data
    });
    console.log(this.state.employees);
  }



  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  handleEdit = defectId => {
    this.showModal();
    console.log(defectId);
    this.setState({
      defectId: defectId
    });
    axios
      .get("http://localhost:8081/defectservices/getDefectById/" + defectId)
      .then(response => {
        console.log(response);
        this.setState({
         // employeeautoId: response.data.empId,
          defectId: response.data.defectId,
          type: response.data.type,
          moduleId: response.data.moduleId,
          abbre: response.data.abbre,
          projectId: response.data.projectId,
          priority:response.data.priority,
          severity: response.data.severity,
          status: response.data.status,
          defectDescription: response.data.defectDescription,
          stepsToRecreate: response.data.stepsToRecreate,
          assignTo: response.data.assignTo,
          reassignTo: response.data.reassignTo,
          enteredBy: response.data.enteredBy,
          fixedBy: response.data.fixedBy,
          availableIn: response.data.availableIn,
          foundIn: response.data.foundIn,
          fixedIn: response.data.fixedIn,
          dateAndTime: response.data.dateAndTime,
          
//employeeFirstName:response.data.firstname,
         // employeeDesignation: response.data.designationid,
//employeeEmail: response.data.email
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onChange2 = e => {
    this.setState({
      comments: e.target.value
    });
  };
  attachment = id => {
    axios
      .get("http://localhost:8081/defectservices/listFile/" + id)
      .then(data => {
        data.data.map(file => {
          console.log(file.fileDownloadUri);
          this.setState({
            images: [...this.state.images, file.fileDownloadUri],
            isOpen: true
          });
        });
      });
  };






  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  onSubmit(e) {
    //e.preventDefault();
    const commentsu = {
      comments: this.state.comments,
      defectId: this.state.defectId
    };
    //var myJSON = JSON.stringify(commentsu);
    console.log(commentsu);
    if (this.state.count < 5) {
      axios
        .post("http://localhost:8081/defectservices/comments", commentsu)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.getComment(this.state.defectId);
        });
      this.setState({
        comments: "",
        count: this.state.count + 1
      });
    } else {
      message.error("Can't add more than 5 comments");
    }
  }
  


  componentWillMount() {
    this.getAllDefect();
  }
  //componentDidMount() {
   // this.forceUpdate();
  //}
  refreshDefect() {
    axios
      .get("http://localhost:8081/defectservices/getAllDefects")
      .then(response => {
        console.warn("Refresh Service is working");
        this.setState({ defect: response.data });
      });
  }

  refresh = () => {
    this.forceUpdate();
  };

  onChange1 = value => {
    console.log(`selected ${value}`);

    const auditinfo = {
      status: "Status changes to " + value,
      user: "romi",
      defectId: this.state.defectId
    };

    this.setState({
      audit: auditinfo
    });
    console.log(this.state.audit);
  };
  onBlur() {
    console.log("blur");
  }
  onFocus() {
    console.log("focus");
  }
  onSearch(val) {
    console.log("search:", val);
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  showModal1 = () => {
    this.setState({
      visible1: true
    });
  };
  showModalView = id => {
    this.setState({
      addAttachment: {
        name: "files",
        action:
          "http://localhost:8081/defectservices/uploadMultipleFiles?defectId=" +
          id,
        headers: {
          authorization: "authorization-text"
        },
        multiple: true
      }
    });
    console.log(this.state.addAttachment);
    this.getComment(id);
    this.setState({
      showModalView: true,
      defectId: id,
      comments: "",
      images: []
    });
  };



  handleOkView = e => {
    console.log(e);
    axios
      .post("http://localhost:8081/defectservices/audit/", this.state.audit)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });

    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  handleCancel1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };
  handleCancelView = e => {
    console.log(e);
    this.setState({
      showModalView: false,
      defectId: ""
    });
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null
    });
  };

  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age"
      }
    });
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: "Han Solo",
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          },
          ...this.state.comments
        ]
      });
    }, 1000);
  };

  handleChangeState = event => {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;
    this.setState({
      [inputName]: inputValue
    });
  };
  handleChangeSeverity = value => {
    this.setState({ severity: value });
  };

  
  
  handleChangePriority = value => {
    this.setState({ priority: value });
  };

  handleChangeType = value => {
    this.setState({ type: value });
  };
  handleChangeStatus = value => {
    this.setState({ status: value });
  };
 // handleChangeDefectDescription= value => {
 //   this.setState({ defectDescription: value });
 // };
  handleChangeFoundIn = value => {
    this.setState({ foundIn: value });
  };
  // handleChangeFixedIn = value => {
  //    this.setState({ type: value });
  //};

  handleChangeAssignTo = value => {
    this.setState({ assignTo: value });
  };
  

  remove = id => {
    console.log(id);
    fetch("http://localhost:8081/defectservices/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        this.getComment(this.state.defectId);
      })
      .catch(err => err);
    message.success("Comment Successfully Deleted");
  };
  // componentDidMount() {
  //   this.getComment();
  // }
  getComment = id => {
    axios
      .get("http://localhost:8081/defectservices/comments/" + id)
      .then(resp => {
        let Data = resp.data;
        this.setState({ count: Data.length });
        let comment = Data.map(e => {
          // return <div><p>{e.comments}</p></div>
          return (
            <table style={{ border: "2px" }}>
              <tr key={e.id}>
                <td
                  style={{
                    width: "300px",
                    wordWrap: "break-word",
                    maxWidth: "250px"
                    //wordBreak: "break-all"
                  }}
                >
                  {e.comments}
                </td>
                <td>
                  {/* <Icon type="minus-circle" style={{ color: 'red' }} onClick={() => this.remove(e.commentId)} /> */}
                  {/* <Button size="sm" color="danger" onClick={() => this.remove(e.commentId)}>Delete</Button> */}
                  <Popconfirm
                    title="Are you sure want to delete this Entry ?"
                    icon={
                      <Icon
                        type="question-circle-o"
                        style={{
                          color: "red"
                        }}
                      />
                    }
                    onConfirm={() => this.remove(e.commentId)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">
                      <Icon type="minus-circle" style={{ color: "red" }} />
                    </a>
                  </Popconfirm>
                </td>
              </tr>
            </table>
          );
        });
        this.setState({ comment });
        console.log(comment);
      });
  };

  Preloader(props) {
    return <img src="spinner.gif" />;
  }

  //Getting All defect details
  getdefectStatus() {
    const url = "http://localhost:8081/defectservices/getAllDefects";
    axios
      .get(url)
      .then(response =>
        this.setState({
          defect: response.data
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.getdefectStatus();
  }

  //Deleting defect details
  handleDelete = defectId => {
    axios
      .delete("http://localhost:8081/defectservices/deleteDefect/" + defectId)
      .then(console.log(defectId))
      .catch(err => console.log(err));

    const defect = this.state.defect.filter(defect => {
      return defect.defectId !== defectId;
    });
    this.setState({
      defect
    });
  };
  //fetching the employee with get all employee
  getAllDefect = () => {
   
    const _this = this;
    
    axios
      .get("http://localhost:8081/defectservices/getAllDefects")
      .then(function(response) {
        // handle success
        console.log(response);

        var data = response.data;
        console.log("gjhgjhg"+response.data.length);
        for (let a = 0; a < data.length; a++) {
          _this.state.defect.push({
            defectId: data[a].defectId,
            projectName: data[a].projectName,
            moduleName: data[a].moduleName,
            severity: data[a].severity,
            priority: data[a].priority,
            type: data[a].type,
            foundIn: data[a].foundIn,
            status: data[a].status
          });
        }
        console.log(this.state.defect);
        alert(this.state.defect.length)
      });

    this.setState({ state: this.state,
     
     });
  };

  render() {
    const departureValidationMessage = 'Please select a departure country!';
    //const { formerrors } = this.state;
    //const { getFieldDecorator } = this.props.form;
    const { photoIndex, isOpen, images } = this.state;
    const { comments, submitting, value, defect } = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Defect Id",
        dataIndex: "defectId",
        key: "defectId",
        //filters: [{ text: 'Joe', value: 'Joe' }, { text: 'Jim', value: 'Jim' }],
        //filteredValue: filteredInfo.defectId || null,
        //onFilter: (value, record) => record.defectId.includes(value),
        //sorter: (a, b) => a.defectId.length - b.defectId.length,
        //sortOrder: sortedInfo.columnKey === "defectId" && sortedInfo.order
      },
      {
        title: "Project Name",
        dataIndex: "projectName",
        key: "projectName",
        filters: [
          { text: "Leave", value: "leave" },
          { text: "Defect", value: "defect" },
          
        ],
        
        filteredValue: filteredInfo.projectName || null,
        onFilter: (value, record) => record.projectName.includes(value),
        },
      {
        title: "Module Name",
        dataIndex: "moduleName",
        key: "moduleName",
        filters: [
          { text: "Login", value: "login" },
          { text: "Defect", value: "defect" },
          
        ],
      
        filteredValue: filteredInfo.moduleName || null,
        onFilter: (value, record) => record.moduleName.includes(value),
       
      },
      {
        title: "Severity",
        dataIndex: "severity",
        key: "severity",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.severity || null,
        onFilter: (value, record) => record.severity.includes(value)
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        filters: [
          { text: "High", value: "High" },
          { text: "Medium", value: "Medium" },
          { text: "Low", value: "Low" }
        ],
        filteredValue: filteredInfo.priority || null,
        onFilter: (value, record) => record.priority.includes(value)
        
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        filters: [
          { text: "UI", value: "UI" },
          { text: "Functinality", value: "Functinality" },
          { text: "Enhancement", value: "Enhancement" }
        ],
        filteredValue: filteredInfo.type || null,
        onFilter: (value, record) => record.type.includes(value)
        
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        
        filters: [
          { text: "Open", value: "Open" },
          { text: "Re-opened", value: "Re-opened" },
          { text: "Defrred", value: "Defrred" }
        ],
        filteredValue: filteredInfo.status || null,
        onFilter: (value, record) => record.status.includes(value),
      
      },
      {
        title: "Found In",
        dataIndex: "foundIn",
        key: "foundIn",
        filters: [
          { text: "Release1", value: "Release1" },
          { text: "Release2", value: "Release2" },
          { text: "Release3", value: "Release3" }
        ],
        filteredValue: filteredInfo.fixedIn || null,
        onFilter: (value, record) => record.status.includes(value),
      
      },
      
      
      {
        title: "Action",
        key: "action",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              type="edit"
              onClick={this.handleEdit.bind(this, data.defectId)}
              style={{ fontSize: "18px", color: "green" }}
            />
            <Divider type="vertical" />

            <Popconfirm
              title="Are you sure want to delete this Entry ?"
              icon={
                <Icon
                  type="question-circle-o"
                  style={{
                    color: "red"
                  }}
                />
              }
              onConfirm={this.handleDelete.bind(this, data.defectId)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <a href="#">
                <Icon
                  type="delete"
                  style={{
                    color: "red",
                    fontSize: "18px"
                  }}

                  // onClick={() => this.handleDelete(data.defectId)}
                />
              </a>
            </Popconfirm>
            
          </span>
        )
      },
      {
        title: "More",
        key: "more",
        render: (text, data = this.state.defect, record) => (
          <span>
            <Icon
              type="arrows-alt"
              style={{ fontSize: "18px", color: "green" }}
              onClick={() => this.showModalView(data.defectId)}
            />
          </span>
        )
      },
      {

      }
    ];
  
    return (
      <div>
        <EditorIn />
        
        
        
        <Table
          columns={columns}
          dataSource={this.state.defect}
          onChange={this.handleChange}
          scroll={{ x: 1300 }}
          pagination={{
            total: this.state.Total,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
            pageSize: 10,
            showSizeChanger: true
            // showQuickJumper: true
          }} 
        />


                  
          
          
        {/* Edit Defects Part  */}
        <Modal
          title="Edit Defects"
          visible={this.state.visible}
          // onOk={this.handleEditOk.bind(this, this.state.defectId)}
          onOk={this.handleOk.bind(this, this.state.defectId)}
          onCancel={this.handleCancel}
          width="600px"

        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Defect Id: ">
                  <Input placeholder="Defect Id" disabled="true"  
                   value={this.state.defectId}
                   onChange={this.onChangeDefectId}
                  />
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Status">
                <Input
                //placeholder="Description"
               // autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.status}
                onChange={this.onChangeStatus}
               // onChange={this.onChangeEmployeeName}
              />
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Fixed In">
                <Input
                //placeholder="Description"
               // autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.fixedIn}
                onChange={this.onChangeFixedIn}
               // onChange={this.onChangeEmployeeName}
              />
                  
                </Form.Item>
              </Col>
        
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Type">
                <Input
                //placeholder="Description"
               // autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.type}
                onChange={this.onChangeType}
               // onChange={this.onChangeEmployeeName}
              />
                  
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Severity">
                <Input
                //placeholder="Description"
                //autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.severity}
                onChange={this.onChangeSeverity}
               // onChange={this.onChangeEmployeeName}
              />
                 
                </Form.Item>
              </Col>
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label=" Priority">
                <Input
                //placeholder="Description"
                //autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.priority}
                onChange={this.onChangePriority}
               // onChange={this.onChangeEmployeeName}
              />
                 
                </Form.Item>
              </Col>
             
            </Row>
            <Row>
              
              <Col span={8} style={{ padding: "5px" }}>
                <Form.Item label="Found In: ">
                  <Select
                   // defaultValue="Release"
                    style={{ width: "100%" }}
                    onChange={this.onChange}
                    value={this.state.foundIn}
                    //onChange={this.onChangeEmployeeName}
                  >
                    <Option value="Release1">Release1</Option>
                    <Option value="Release2">Release2</Option>
                    <Option value="Release3">Release3</Option>
                  </Select>
                </Form.Item>
              </Col>
              
            </Row>

            <Form.Item label=" Description: ">
              <TextArea
                placeholder="Description"
                autosize={{ minRows: 3, maxRows: 12 }} 
                value={this.state.defectDescription}
               // onChange={this.onChangeEmployeeName}
              />
              
            </Form.Item>

            <Form.Item label=" Steps to Re-create: ">
              <TextArea placeholder="" autosize={{ minRows: 6, maxRows: 12 }}  value={this.state.stepsToRecreate}
                     // onChange={this.onChangeEmployeeName}
                      />
            </Form.Item>

            <Form.Item label="Designation">
                      <Select
                        // defaultValue="Select Designation"
                        //onChange={this.onChangeEmployeeDesignation}
                        value={this.state.assignTo}
                      >
                        {this.state.employees.map(function(item, index) {
                          return (
                            <Option key={index} value={item.designationid}>
                              {item.designationname}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
          </Form>
        </Modal>
        {/* More Details View */}
        <Modal
          title="More Details"
          visible={this.state.showModalView}
          onOk={this.handleOkView}
          onCancel={this.handleCancelView}
          width="600px"
        >
          <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <p>
                <b>Module name:</b>
              </p>
              <p>
                <b>Description:</b>
              </p>
              <p>
                <b>Steps to Recreate:</b>
              </p>
              <p>
                <b>Severity:</b>
              </p>
              <p>
                <b>Priority:</b>
              </p>
              <p>
                <b>Defect Type:</b>
              </p>
              <p>
                <b>Found In:</b>
              </p>
              <p>
                <b>Fixed In:</b>
              </p>

              <p>
                <b>Entered By:</b>
              </p>
              <p>
                <b>Entered Date:</b>
              </p>
              <p>
                <b>Assigned To:</b>
              </p>
              <p>
                <b>Fixed By:</b>
              </p>
              <p>
                <b>Available Date:</b>
              </p>
              <p>
                <b>Status:</b>
              </p>
              <p>
                <b>Comments:</b>
              </p>
            </Col>
            <Col span={14} style={{ padding: "5px" }}>
              <p>Defect Dashboard</p>
              <p>Samuel Gnanam IT Centre has devoted itself </p>
              <p>Lorem ipsum dolor sit amet consectetur. </p>
              <p>
                <Tag color="red">High</Tag>
              </p>
              <p>
                {" "}
                <Tag color="orange">Low</Tag>
              </p>
              <p>UI</p>
              <p>Release1</p>
              <p>Release1</p>
              <p>Tom</p>
              <p>05.05.2019</p>
              <p>Sam</p>
              <p>User1</p>
              <p>Tom</p>
              <p>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  defaultValue="New"
                  optionFilterProp="children"
                  onChange={this.onChange1}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                  onSearch={this.onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="New">New</Option>
                  <Option value="open">open</Option>
                  <Option value="fixed">fixed</Option>
                  <Option value="close">close</Option>
                  <Option value="reopen">reopen</Option>
                  <Option value="rejected">rejected</Option>
                </Select>
              </p>

              <p>{this.state.comment}</p>
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ padding: "5px" }}>
              <Button
                type="primary"
                onClick={() => this.attachment(this.state.defectId)}
              >
                View Attachments
              </Button>
              {isOpen && (
                <Lightbox
                  mainSrc={images[photoIndex]}
                  nextSrc={images[(photoIndex + 1) % images.length]}
                  prevSrc={
                    images[(photoIndex + images.length - 1) % images.length]
                  }
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex:
                        (photoIndex + images.length - 1) % images.length
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % images.length
                    })
                  }
                />
              )}
            </Col>

            <Col span={14} style={{ padding: "5px" }}>
              <Upload {...this.state.addAttachment}>
                <Button>
                  <Icon type="upload" /> Click to Upload
                </Button>
              </Upload>
            </Col>
          </Row>
          <Divider />
          <h3>Comments</h3>
          {/* {comments.length > 0 && <CommentList comments={comments} />} */}
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.onChange2}
                onSubmit={this.onSubmit}
                submitting={submitting}
                value={this.state.comments}
                name="comments"
              />
            }
          />
        </Modal>
        
      </div>
    );
  }
}

export default TableFilter;
